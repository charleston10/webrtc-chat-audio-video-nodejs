import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {FileService} from './file.service';


@Injectable()
export class AppService {

    constructor(private readonly fileService: FileService) {
    }

    connect(localDescription: string) {
        let uuid = uuidv4();

        const json = this.fileService.read();

        json.push({
            id: uuid,
            localDescription: localDescription
        });

        this.fileService.write(JSON.stringify(json));
    }

    disconnect(id: string) {
        const json = this.fileService.read();
        const item = json.find((element: any) => element.id == id);
    }

    connections() {
        const json = this.fileService.read();
        return json;
    }

    pair(myId: string, pairId: string) {

    }
}
