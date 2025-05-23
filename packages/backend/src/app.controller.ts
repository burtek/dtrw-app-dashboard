/* eslint-disable n/no-extraneous-import -- FIXME */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { Controller, Get, Req } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

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
    whoAmI(@Req() request: ExpressRequest): Data {
        return {
            name: request.headers['remote-user'] as string | undefined ?? '',
            groups: (request.headers['remote-groups'] as string | undefined)?.split(',') ?? []
        };
    }
}
