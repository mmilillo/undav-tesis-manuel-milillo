import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { VersionControlService } from './version-control.service';
import { GitCommandDto } from './gitCommandDto';
import { ApiTags } from '@nestjs/swagger';
import { GitFile } from './gitFile';

@Controller('version-control')
@ApiTags('version-control')
export class VersionControlController {

    constructor(private readonly versionControlService: VersionControlService) {}

    @Post('/status')
    @HttpCode(200)
    async status(@Body() gitCommandDto: GitCommandDto): Promise <GitFile[]> {
        // TODO: Validaciones automaticas de esquema
        if(!gitCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        return await this.versionControlService.getStatus(gitCommandDto);
    }

    @Post('/commit')
    @HttpCode(201)
    async commit(@Body() gitCommandDto: GitCommandDto): Promise <void> {
        // TODO: Validaciones automaticas de esquema
        if(!gitCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        // TODO: Validaciones automaticas de esquema
        if(!gitCommandDto.message){
            throw new HttpException('message must be defined', HttpStatus.BAD_REQUEST);
        }

        return await this.versionControlService.commitChanges(gitCommandDto);
    }

    @Post('/reset')
    @HttpCode(200)
    async reset(@Body() gitCommandDto: GitCommandDto): Promise <void> {
        // TODO: Validaciones automaticas de esquema
        if(!gitCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        return await this.versionControlService.resetChanges(gitCommandDto);
    }
    

    /*@Post()
    async runComposeCommand(@Body() gitCommandDto: GitCommandDto): Promise <GitFile[]> {
        // TODO: Validaciones automaticas de esquema
        if(!gitCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        if(!gitCommandDto.operation){
            throw new HttpException('operation must be defined', HttpStatus.BAD_REQUEST);
        }

        return await this.versionControlService.exect(gitCommandDto);
    }*/
}
