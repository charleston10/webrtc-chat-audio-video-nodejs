import {Injectable, Logger} from "@nestjs/common";
import * as fs from 'fs';
import path = require("path");

@Injectable()
export class FileService {

    private readonly logger = new Logger(FileService.name);

    private readonly folder = 'temp'
    private readonly file = 'temp.json';

    constructor() {
        this.create();
    }

    write(data: any) {
        return fs.writeFileSync(this.filePath(), data);
    }

    read() {
        return JSON.parse(fs.readFileSync(this.filePath(), 'utf8'));
    }

    private filePath(): string {
        return path.resolve(this.folder, this.file);
    }

    private fileExists(): boolean {
        try {
            fs.accessSync(this.filePath(), fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    private create() {
        this.logger.debug('checking temp');
        if (!this.fileExists()) {
            this.logger.debug('temp not created');
            this.logger.debug('creating temp');
            fs.writeFileSync(this.filePath(), '[]');
            this.logger.debug('temp created');
        } else {
            this.logger.debug('temp already created');
        }
    }
}
