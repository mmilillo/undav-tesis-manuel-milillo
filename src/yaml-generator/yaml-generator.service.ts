import { Injectable, Logger } from '@nestjs/common';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import {load, dump} from 'js-yaml';
import { CreateFileDto } from './CreateFileDto';
import { strict } from 'node:assert';
import { string } from 'yaml/dist/schema/common/string';
import { Laboratory } from 'src/command/laboratory';
import { extname, basename } from 'path';

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

  getComposeFile(createFileDto: CreateFileDto ): void {

    const filePath = `./src/docker-compose/${createFileDto.laboratoryName}.yml`;
    if (!existsSync(filePath)) throw new Error('File does not exists');

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


  readComposeFiles(): Laboratory[] {
    const filePath = `./src/docker-compose`;
    let files : string [] = readdirSync(filePath);

    // Eliminar la extensión .yml de cada archivo
    const filesWithoutExtension = files.map(file => {
      if (extname(file) === '.yml') {
        return basename(file, '.yml'); // Remueve la extensión .yml
      }
      return file; // Si no tiene la extensión .yml, lo retorna sin cambios
    });

    // Crear una instancia de Laboratory por cada archivo en el array
    const laboratories = filesWithoutExtension.map((file, index) => {
      return new Laboratory((index + 1).toString(), file); // index + 1 como id, nombre del archivo como laboratoryName
    });


    console.log(laboratories);

    return laboratories;

  }

  getComposeFiles() : Laboratory[] {
    return this.readComposeFiles();

  }

  getComposeFileByName(laboratoryName: string): Laboratory {

    const laboratories = this.readComposeFiles();
    const laboratory : Laboratory = laboratories.find(lab => lab.laboratoryName === laboratoryName);

    if(!laboratory){
      throw 'laboratorio no encontrado'
    }

    return laboratory;

  }

}
