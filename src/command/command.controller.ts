import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandService } from './command.service';
import { ComposeCommandDto } from './composeCommandDto';
import { ApiTags } from '@nestjs/swagger';
import { Laboratory } from './laboratory';

@Controller('command')
@ApiTags('podman-compose')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    async runComposeCommand(@Body() composeCommandDto: ComposeCommandDto): Promise <string> {
        // TODO: Validaciones automaticas de esquema
        if(!composeCommandDto.laboratoryName){
            throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
        }

        if(!composeCommandDto.operation){
            throw new HttpException('operation must be defined', HttpStatus.BAD_REQUEST);
        }

        return await this.commandService.exect(composeCommandDto);
    }

    @Get(':laboratoryName')
    async getPods(@Param() params : any): Promise <Laboratory> {

        const laboratory : Laboratory = await this.commandService.get(params.laboratoryName);

        if(!laboratory){
            throw new HttpException('Laboratory not found', HttpStatus.NOT_FOUND);
        }

        return laboratory;
    }

}
