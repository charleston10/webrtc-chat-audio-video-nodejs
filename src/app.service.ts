import {Injectable} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import {FileService} from './file.service';
import {ConnectModel} from "./model/connect.model";


@Injectable()
export class AppService {

    constructor(private readonly fileService: FileService) {
    }

    connect(name: string, photoUrl: string, connection: string) {
        const model: ConnectModel = {
            id: uuidv4(),
            name: name,
            photoUrl: photoUrl,
            connection: connection,
            connectedWith: null
        }

        const list = this.fileService.read();
        list.push(model);

        this.fileService.write(JSON.stringify(list));
    }

    disconnect(id: string) {
        if (this.isPaired(id)) {
            this.unpair(id);
        }

        const list = this.fileService.read();

        let model = this.getModel(list, id);
        let index = list.indexOf(model);

        list.splice(index, 1)

        this.fileService.write(JSON.stringify(list));
    }

    connections() {
        const list = this.fileService.read();
        return list;
    }

    pair(myId: string, pairId: string) {
        const list = this.fileService.read();

        let my = this.getModel(list, myId);
        let pair = this.getModel(list, pairId);

        let myIndex = list.indexOf(my);
        let pairIndex = list.indexOf(pair);

        list[myIndex].connectedWith = pairId
        list[pairIndex].connectedWith = myId

        this.fileService.write(JSON.stringify(list));
    }

    unpair(id: string) {
        const list = this.fileService.read();

        let my = this.getModel(list, id);
        let pair = this.getModel(list, my.connectedWith ?? '');

        let myIndex = list.indexOf(my);
        let pairIndex = list.indexOf(pair);

        list[myIndex].connectedWith = null
        list[pairIndex].connectedWith = null

        this.fileService.write(JSON.stringify(list));
    }

    clear() {
        this.fileService.write('[]');
    }

    private getModel(list: [], id: string): ConnectModel {
        return list.find((item: ConnectModel) => item.id == id)!
    }

    private isPaired(id: string) {
        const list = this.fileService.read();
        let model = list.find((item: ConnectModel) => item.id == id && item.connectedWith != null);
        return model == null ? false : true
    }
}

