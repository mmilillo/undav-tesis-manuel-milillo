import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags('app-controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {

    
    this.appService.generateFile('ubuntu','postgres');

    return this.appService.getHello();
    
  }
}
