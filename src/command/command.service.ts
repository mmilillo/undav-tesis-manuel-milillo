import { Injectable } from '@nestjs/common';
import {exec, spawn} from 'node:child_process';
import { ComposeCommandDto } from './composeCommandDto';
import { existsSync } from 'node:fs';

@Injectable()
export class CommandService {

  async exect(composeCommandDto: ComposeCommandDto) : Promise<string>{

    const filePath = `./src/docker-compose/${composeCommandDto.laboratoryName}.yml`;
    if (!existsSync(filePath)){
      throw new Error('File not exists');
    } 

    let params = ['-f', `./src/docker-compose/${composeCommandDto.laboratoryName}.yml`, composeCommandDto.operation]

    if(composeCommandDto.operation == 'up' || composeCommandDto.operation == 'start'){
      params.push('-d')
    }

    const childProcess = spawn('podman-compose', params);
  
    let data = "";
    for await (const chunk of childProcess.stdout) {
        console.log('stdout chunk: '+chunk);
        data += chunk;
    }

    let error = "";
    for await (const chunk of childProcess.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }

    const exitCode = await new Promise( (resolve, reject) => {
        childProcess.on('close', resolve);
    });

    if(exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }
    return data;
  }

  async get(laboratoryName: string) : Promise<string[]>{

    const childProcess = exec(`podman ps --format "{{.Names}} {{.ID}}" | grep '${laboratoryName}'`);
  
    let data = "";
    for await (const chunk of childProcess.stdout) {
        console.log('stdout chunk: '+chunk);
        data += chunk;
    }

    let error = "";
    for await (const chunk of childProcess.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }

    const exitCode = await new Promise( (resolve, reject) => {
        childProcess.on('close', resolve);
    });

    if(exitCode) {
        //throw new Error( `subprocess error exit ${exitCode}, ${error}`);
        console.error( `subprocess error exit ${exitCode}, ${error}`);
    }

    if(!data) return [];

    return data.split('\n').filter(linea => linea.trim() !== '');
  }

}