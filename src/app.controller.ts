import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {AppService} from './app.service';

@Controller()
export class AppController {

    constructor(
        private readonly appService: AppService
    ) {
    }

    @Get('ping')
    async ping(@Res() res: Response) {
        return res.status(HttpStatus.OK)
            .json({
                "code": HttpStatus.OK,
                "message": "ping ok"
            })
    }

    @Post('connect')
    async connect(@Body() dto: ConnectDto) {
        this.appService.connect(dto.id, dto.localDescription)
    }

    @Post('disconnect')
    async disconnect(@Body() dto: DisconnectDto) {
        this.appService.disconnect(dto.id)
    }
}
