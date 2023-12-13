import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import {load, dump} from 'js-yaml';

type OperatingSystem =
  | 'ubuntu'
  | 'windows';

  type DataBase =
  | 'postgres'
  | 'mysql';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  
  generateFile(operatingSystem : OperatingSystem, dataBase? : DataBase ): void {
    try {
      const dockerComposeFile = readFileSync('./src/templates/docker-compose-template.yaml', 'utf8')
      const soFile = readFileSync('./src/so/ubuntu.yaml', 'utf8')
      const dbFile = readFileSync('./src/db/postgres.yaml', 'utf8')

      const dockerCompose = load(dockerComposeFile);
      const so = load(soFile);
      const db = load(dbFile);

      console.log(dockerCompose);
      console.log('-----');
      console.log(so);
      console.log('-----');
      console.log(db);
      console.log('-----');

      dockerCompose.services = {}; 
      dockerCompose.services.SO = so;
      dockerCompose.services.DB = db;

      console.log(dockerCompose);

      writeFileSync('./src/docker-compose/docker-compose.yml', dump(dockerCompose));

    } catch (e) {
      console.log(e);
    }
  }
}
