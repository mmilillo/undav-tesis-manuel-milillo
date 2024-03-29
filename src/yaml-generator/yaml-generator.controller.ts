import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { YamlGeneratorService } from './yaml-generator.service';
import { CreateFileDto } from './CreateFileDto';
import { error } from 'console';
import { response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('yaml-generator')
@ApiTags('yaml-generator')
export class YamlGeneratorController {
    constructor(private readonly yamlGeneratorService: YamlGeneratorService) {}

  @Put()
  @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'OS must be defined.'})
  createFile(@Body() createFileDto: CreateFileDto): string {

    if(!createFileDto.os){
      throw new HttpException('OS must be defined', HttpStatus.BAD_REQUEST);
    }

    try{
        this.yamlGeneratorService.generateFile(createFileDto);
    }catch(e){
        return "error creating file: " + e;
    }
    
    return "File created";
    
  }
}
