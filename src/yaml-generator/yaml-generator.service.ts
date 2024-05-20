import { Injectable, Logger } from '@nestjs/common';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import {load, dump} from 'js-yaml';
import { CreateFileDto } from './CreateFileDto';

@Injectable()
export class YamlGeneratorService {
  generateFile(createFileDto: CreateFileDto ): void {

    const filePath = `./src/docker-compose/${createFileDto.laboratoryName}.yml`;
    //if (existsSync(filePath)) throw new Error('File already exists');

    const podmanComposeFile = readFileSync('./src/template/podman-compose-template.yaml', 'utf8');
    const compose = load(podmanComposeFile);
    compose.services = {}; 

    //const osPath = './src/os/' + createFileDto.os + '.yaml';
    const osPath = `./src/os/${createFileDto.os}.yaml`;
    const osFile = readFileSync(osPath, 'utf8');
    const os = load(osFile);
    os.container_name = createFileDto.laboratoryName + os.container_name;
    compose.services.SO = os;


    if(createFileDto.db){
      //const dbPath = './src/db/' + createFileDto.db + '.yaml';
      const dbPath = `./src/db/${createFileDto.db}.yaml`;
      const dbFile = readFileSync(dbPath, 'utf8');
      const db = load(dbFile);
      db.container_name = createFileDto.laboratoryName + db.container_name;
      compose.services.DB = db;
    }
    
    console.debug("compose yaml generated on memory.");
    console.debug(compose);

    writeFileSync(filePath, dump(compose));

  }

}
