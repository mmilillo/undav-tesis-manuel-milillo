import { Injectable } from '@nestjs/common';
import {exec, spawn} from 'node:child_process';
import { ComposeCommandDto } from './composeCommandDto';
import { existsSync } from 'node:fs';
import { Laboratory } from './laboratory';
import { Container } from './container';
import { string } from 'yaml/dist/schema/common/string';

@Injectable()
export class CommandService {
   regex = /(.*)_(os|db)_(.*)/;
   //regexOs = /_os_(.*)/;

  async exect(composeCommandDto: ComposeCommandDto) : Promise<string>{

    const filePath = `./src/docker-compose/${composeCommandDto.laboratoryName}.yml`;
    if (!existsSync(filePath)){
      throw new Error('File not exists');
    } 

    let params = ['-f', `./src/docker-compose/${composeCommandDto.laboratoryName}.yml`, composeCommandDto.operation]

    if(composeCommandDto.operation == 'up' || composeCommandDto.operation == 'start'){
      params.push('-d')
    }

    console.log(params)


    const childProcess = spawn('podman-compose', params);
  
    let data = "";
    for await (const chunk of childProcess.stdout) {
        console.log('stdout chunk: '+ chunk);
        data += chunk;
    }

    let error = "";
    for await (const chunk of childProcess.stderr) {
        console.error('stderr chunk: '+ chunk);
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

  async get(laboratoryName?: string) : Promise<Laboratory[]>{

    //let command :string = `podman ps --format "{{.Names}} {{.ID}}"`;
    let command : string = `podman ps --format "{{.Names}} {{.ID}} {{.Status}}"`;


    if(laboratoryName){
      //command =  command + ` | grep '^${laboratoryName}_os'`;
      command =  command + ` | grep '^${laboratoryName}'`;
    }
    //const command :string =  `podman ps --format "{{.Names}} {{.ID}}" | grep '^${laboratoryName}_os'`;


    console.log('command: ' + command);

    const childProcess = exec(command);
  
    

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
        console.error( `subprocess error exit ${exitCode}, ${error}`);
    }

    if(!data) return null;

    console.log(data)


    const containers: Container[] = data
    .split('\n') // Dividir en líneas
    .filter(linea => linea.trim() !== '') // Filtrar líneas vacías
    .map(linea => {
      const [nombre, id, ...statusParts] = linea.split(' ');
      const status = statusParts.join(' '); // Unir el resto del contenido para obtener el status
      return new Container(id, nombre, status); // Asumiendo que Laboratory tiene un constructor con 3 parámetros
    });

    containers.forEach(lab => {
      const match = lab.containerName.match(this.regex);
  
      lab.laboratoryName = match && match[1] ? match[1] : 'No disponible';
      lab.type =  match && match[2] && match[2] == 'os' ? 'OS' : 'DB';
      lab.systemName = match && match[3] ? match[3] : 'No disponible';
      
    });

    console.log(containers);

    const mapaLaboratorios: { [key: string]: Container[] } = {};

    // Iterar sobre cada contenedor y agruparlos por `laboratoryName`
    containers.forEach((container) => {
      if (!mapaLaboratorios[container.laboratoryName]) {
        mapaLaboratorios[container.laboratoryName] = [];
      }
      mapaLaboratorios[container.laboratoryName].push(container);
    });

    // Crear un array de instancias de Laboratory 
    const laboratories: Laboratory[] = Object.keys(mapaLaboratorios).map((nombreLab) => {
      let laboratory = new Laboratory(nombreLab,nombreLab,'runing');
      laboratory.containers = mapaLaboratorios[nombreLab];
      return laboratory;
    });

    return laboratories;
  }

}
