import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommandService } from './command.service';
import { ComposeCommandDto } from './composeCommandDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Laboratory } from './laboratory';

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

}
