import {Body, Controller, Delete, Get, HttpStatus, Post, Res} from '@nestjs/common';
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

    @Get('connections')
    async connections(@Res() res: Response) {
        const result = this.appService.connections();
        return res.status(HttpStatus.OK).json(result)
    }

    @Post('connect')
    async connect(@Body() dto: ConnectDto) {
        this.appService.connect(dto.name, dto.photoUrl, dto.connection)
    }

    @Post('disconnect')
    async disconnect(@Body() dto: DisconnectDto, @Res() res: Response) {
        this.appService.disconnect(dto.id)
        return res.status(HttpStatus.OK).send()
    }

    @Post('pair')
    async pair(@Body() dto: PairDto, @Res() res: Response) {
        this.appService.pair(dto.myId, dto.pairId)

        return res.status(HttpStatus.OK)
            .json({
                "paired": true,
                ...dto
            })
    }

    @Post('unpair')
    async unpair(@Body() dto: UnpairDto, @Res() res: Response) {
        this.appService.unpair(dto.id);

        return res.status(HttpStatus.OK).send();
    }

    @Delete('connections')
    async clear(@Res() res: Response) {
        this.appService.clear()
        return res.status(HttpStatus.OK).send()
    }
}
