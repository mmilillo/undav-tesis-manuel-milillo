import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandService } from './command.service';
import { ComposeCommandDto } from './composeCommandDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Laboratory } from './laboratory';
import { access, constants, createReadStream } from 'node:fs';
import { join } from 'node:path';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ImportLaboratoryDto } from './importLaboratoryDto';

@Controller('command')
@ApiTags('podman-compose')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    @ApiResponse({ status: 200, description: 'The command has been successfully executed.', type: String})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Required fields not completed.'})
    async runComposeCommand(@Body() composeCommandDto: ComposeCommandDto): Promise <string> {
        // TODO: Validaciones automaticas de esquema
        if(!composeCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        if(!composeCommandDto.operation){
            throw new HttpException('operation must be defined', HttpStatus.BAD_REQUEST);
        }

        await this.commandService.exect(composeCommandDto);

        return JSON.stringify(composeCommandDto);
    }


    @Get(':laboratoryName')
    @ApiResponse({ status: 200, description: 'The command has been successfully executed.', type: Laboratory})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Laboratory not found.'})
    async getPodById(@Param() params : any): Promise <Laboratory> {

        const laboratory : Laboratory[] = await this.commandService.get(params.laboratoryName);

        if(!laboratory){
            throw new HttpException('Laboratory not found', HttpStatus.NOT_FOUND);
        }

        return laboratory[0];
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The command has been successfully executed.', type: Laboratory, isArray: true})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Laboratory not found.'})
    async getPods(@Param() params : any): Promise <Laboratory[]> {

        const laboratory : Laboratory[] = await this.commandService.get();

        if(!laboratory){
            return [];
            throw new HttpException('Laboratory not found', HttpStatus.NOT_FOUND);
        }

        return laboratory;
    }

    @Post('export/:laboratoryName')
    @ApiResponse({ status: 200, description: 'The command has been successfully executed.', type: StreamableFile})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Laboratory not found.'})
    async exportLaboratory(@Param() params : any): Promise<{ path: string }> {

        const laboratory : Laboratory[] = await this.commandService.get(params.laboratoryName);
        
        if(!laboratory){
            throw new HttpException('Laboratory not found', HttpStatus.NOT_FOUND);
        }

        const soLaboratory = laboratory[0].containers.find(container => container.type === "OS");

        try{
            await this.commandService.buildImage(soLaboratory.containerName, soLaboratory.containerName);
            await this.commandService.exportImage(soLaboratory.containerName);
        }
        catch(error){
            console.error(error);
            throw new HttpException('Laboratory already exists', HttpStatus.BAD_REQUEST);
        }

        const filePath : string = join(process.cwd(), `${soLaboratory.containerName}.tar`);

        //const file = createReadStream(filePath);
        //return new StreamableFile(file);

        console.log("filePath exportado: " + filePath);
        return { path: filePath };
    }

    @Post('import')
    async importLaboratory(@Body() importLaboratoryDto: ImportLaboratoryDto): Promise<ImportLaboratoryDto> {

        const laboratoryPath = importLaboratoryDto.laboratoryPath;
        const fileName = importLaboratoryDto.fileName;

        if(!laboratoryPath || !fileName){
            throw new HttpException('Invalid null values', HttpStatus.BAD_REQUEST);
        }

        

        await this.commandService.importImage(laboratoryPath, fileName);
        
        return importLaboratoryDto
    }

}
