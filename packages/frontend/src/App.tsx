import { useEffect, useState } from 'react';


interface Data {
    name: string; groups: string[];
}

function assertData(data: unknown): asserts data is Data {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid data: not an object');
    }
    if (!('name' in data) || typeof data.name !== 'string') {
        throw new Error('Invalid data: name is missing or not a string');
    }
    if (!('groups' in data) || !Array.isArray(data.groups)) {
        throw new Error('Invalid data: groups is missing or not an array');
    }
    for (const group of data.groups) {
        if (typeof group !== 'string') {
            throw new Error('Invalid data: group is not a string');
        }
    }
}

function App() {
    const [response, setResponse] = useState<Data>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/whoami');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const data = await res.json();
                assertData(data);
                setResponse(data);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching data:', error);
            }
        };

        void fetchData();
    }, []);

    return (
        <p>
            Data:
            <pre>{JSON.stringify(response, undefined, 4)}</pre>
        </p>
    );
}
App.displayName = 'App';

export default App;
