import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {FileService} from "./file.service";

@Module({
    controllers: [AppController],
    providers: [AppService, FileService],
})
export class AppModule {
}
