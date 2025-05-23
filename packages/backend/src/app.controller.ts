/* eslint-disable n/no-extraneous-import -- FIXME */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AppService } from './app.service';


interface Data {
    name: string; groups: string[];
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('hello')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('whoami')
    whoAmI(@Req() request: Request): Data {
        return {
            name: request.headers['Remote-User'] as string | undefined ?? '',
            groups: (request.headers['Remote-Groups'] as string | undefined)?.split(',') ?? []
        };
    }
}
