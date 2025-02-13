import { BadRequestException, Body, Controller, Get, Header, HttpException, HttpStatus, Param, Put, Req, Res } from '@nestjs/common';
import { YamlGeneratorService } from './yaml-generator.service';
import { CreateFileDto } from './CreateFileDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Laboratory } from '../command/laboratory';


@Controller('yaml-generator')
@ApiTags('yaml-generator')
export class YamlGeneratorController {
    constructor(private readonly yamlGeneratorService: YamlGeneratorService) {}

  @Put()
  @ApiResponse({ status: 201, description: 'The YAML has been successfully created.', type: CreateFileDto})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Required fields not completed.'})
  createFile(@Body() createFileDto: CreateFileDto): string {

    // TODO: Validaciones automaticas de esquema
    if(!createFileDto.os){
      throw new HttpException('OS must be defined', HttpStatus.BAD_REQUEST);
    }

    if(!createFileDto.laboratoryName){
      throw new HttpException('laboratoryName must be defined', HttpStatus.BAD_REQUEST);
    }

    try{
        this.yamlGeneratorService.generateFile(createFileDto);
    }catch(e){
        return "error creating file: " + e;
    }
    
    
    return JSON.stringify(createFileDto);
    
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The Laboratories has been successfully found.', type: Laboratory, isArray: true})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Required fields not completed.'})
  async getComposeFiles(@Body() createFileDto: CreateFileDto): Promise<Laboratory[]> {
    try{
        return await this.yamlGeneratorService.getComposeFiles();
    }catch(e){
      throw new HttpException('Laboratories can not be found', HttpStatus.NOT_FOUND);
    }
  }


  @ApiResponse({ status: 200, description: 'The Laboratory has been successfully found.', type: Laboratory})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Required fields not completed.'})
  @Get(':laboratoryName')
  async getComposeFilesByName(@Param() params : any): Promise<Laboratory> {
    try{
      console.log('getComposeFilesByName')
        return await this.yamlGeneratorService.getComposeFileByName(params.laboratoryName);
    }catch(e){
      throw new HttpException('Laboratories can not be found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiResponse({ status: 200, description: 'The YAML has been successfully found.', type: String})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Required fields not completed.'})
  @Get(':laboratoryName/file')
  async getYmlFilesByName(@Param() params : any): Promise<string> {
    try{

      console.log('getYmlFilesByName')
        return await this.yamlGeneratorService.getYmlFileByName(params.laboratoryName);
    }catch(e){
      throw new HttpException('Laboratories can not be found', HttpStatus.NOT_FOUND);
    }
  }



}




