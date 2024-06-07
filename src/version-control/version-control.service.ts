import { Injectable } from '@nestjs/common';
import { exec, spawn } from 'child_process';
import { GitCommandDto } from './gitCommandDto';
import { CommandService } from 'src/command/command.service';
import { Laboratory } from 'src/command/laboratory';
import { GitFile } from './gitFile';

@Injectable()
export class VersionControlService {

    constructor(private readonly commandService: CommandService) {}

    async getStatus(gitCommandDto: GitCommandDto) : Promise<GitFile[]>{
        const laboratory : Laboratory = await this.commandService.get(gitCommandDto.laboratoryName);
        return await this.status(laboratory.id);
    }

    async commitChanges(gitCommandDto: GitCommandDto) : Promise<void>{
        const laboratory : Laboratory = await this.commandService.get(gitCommandDto.laboratoryName);
        await this.add(laboratory.id);
        const gitFiles : GitFile[] = await this.status(laboratory.id);
        if(gitFiles.length < 1) return;
        return this.commit(laboratory.id, gitCommandDto.message);
    }

    async resetChanges(gitCommandDto: GitCommandDto) : Promise<void>{
        const laboratory : Laboratory = await this.commandService.get(gitCommandDto.laboratoryName);
        return await this.reset(laboratory.id);

    }


    async status(laboratoryId) : Promise<GitFile[]>{
        const command : string = `podman exec ${laboratoryId} bash -c "cd /working_directory && git status -s"`;

        console.log('command: ' + command);
        
        const subprocessResult: [string, string, any] = await this.exectGitCommand(command);

        const data: string = subprocessResult[0];
        const error: string = subprocessResult[1];
        const exitCode: string = subprocessResult[2];
    
        if(exitCode) {
            throw new Error( `subprocess error exit ${exitCode}, ${error}`);
        }

        let dataArray: string [];
        dataArray = data.split('\n').filter(linea => linea.trim() !== ''); // genero array a partir de saltos de linea
        dataArray = dataArray.map(item => item.replace(/\s+/g, ' ')); // estandarizo la identancion en un solo espacio en cada ocurrencia

        let gitFiles: GitFile[] = [];

        dataArray.forEach((f) => {
            let [status, name] = f.split(' ');
            let gitFile : GitFile = new GitFile(status, name)
            gitFiles.push(gitFile)
          });

        return gitFiles;
    }

    async add(laboratoryId: string) : Promise<void> {
    const command : string = `podman exec ${laboratoryId} bash -c "cd /working_directory && git add . "`;

    console.log('command: ' + command);

    const subprocessResult: [string, string, any] = await this.exectGitCommand(command);

    const error: string = subprocessResult[1];
    const exitCode: string = subprocessResult[2];

    if(exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }

    }

    async commit(laboratoryId: string, message: string) : Promise<void> {

    const command : string = `podman exec ${laboratoryId} bash -c "cd /working_directory && git commit -m '${message}' "`;

    console.log('command: ' + command);

    const subprocessResult: [string, string, any] = await this.exectGitCommand(command);

    const error: string = subprocessResult[1];
    const exitCode: string = subprocessResult[2];

    if(exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }

    }

    async reset(laboratoryId: string) : Promise<void> {

    const command : string = `podman exec ${laboratoryId} bash -c "cd /working_directory && git reset --hard "`;

    console.log('command: ' + command);

    const subprocessResult: [string, string, any] = await this.exectGitCommand(command);

    const error: string = subprocessResult[1];
    const exitCode: string = subprocessResult[2];

    if(exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }

    }

      /**
       * 
       * @param command
       * @returns 
       */
    async exectGitCommand(command : string) : Promise<[string, string, any]>{

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


        return [data, error, exitCode]
    }

}
