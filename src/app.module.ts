import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YamlGeneratorModule } from './yaml-generator/yaml-generator.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { CommandModule } from './command/command.module';
import { VersionControlModule } from './version-control/version-control.module';

@Module({
  imports: [YamlGeneratorModule, CustomLoggerModule, CommandModule, VersionControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
