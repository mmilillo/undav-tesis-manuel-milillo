import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandService } from './command.service';
import { ComposeCommandDto } from './composeCommandDto';

@Controller('command')
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
    async getPods(@Param() params : any): Promise <string[]> {
        return await this.commandService.get(params.laboratoryName);
    }

}
