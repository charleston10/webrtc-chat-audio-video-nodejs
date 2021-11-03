import {Injectable} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AppService {

    constructor() {
    }

    connect(localDescription: string){
       let uuid = uuidv4(); 
    }

    disconnect(id: string){

    }

}
