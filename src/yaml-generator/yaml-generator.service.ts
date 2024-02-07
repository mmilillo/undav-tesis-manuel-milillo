import { Injectable, Logger } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import {load, dump} from 'js-yaml';
import { CreateFileDto } from './CreateFileDto';

@Injectable()
export class YamlGeneratorService {
  generateFile(createFileDto: CreateFileDto ): void {

    const dockerComposeFile = readFileSync('./src/template/podman-compose-template.yaml', 'utf8');
    const dockerCompose = load(dockerComposeFile);
    dockerCompose.services = {}; 

    const osPath = './src/os/' + createFileDto.os + '.yaml';
    const osFile = readFileSync(osPath, 'utf8');
    const os = load(osFile);
    dockerCompose.services.SO = os;


    if(createFileDto.db){
      const dbPath = './src/db/' + createFileDto.db + '.yaml';
      const dbFile = readFileSync(dbPath, 'utf8');
      const db = load(dbFile);
      dockerCompose.services.DB = db;
    }
    
    console.debug("dockerCompose yaml generated on memory.");
    console.debug(dockerCompose);

    writeFileSync('./src/docker-compose/podman-compose.yml', dump(dockerCompose));

  }

}
