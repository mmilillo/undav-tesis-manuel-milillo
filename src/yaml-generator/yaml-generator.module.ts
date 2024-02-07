import { Module } from '@nestjs/common';
import { YamlGeneratorController } from './yaml-generator.controller';
import { YamlGeneratorService } from './yaml-generator.service';

@Module({
  providers: [YamlGeneratorService],
  controllers: [YamlGeneratorController]
})
export class YamlGeneratorModule {}
