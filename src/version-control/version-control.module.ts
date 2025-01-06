import { Module } from '@nestjs/common';
import { VersionControlService } from './version-control.service';
import { VersionControlController } from './version-control.controller';
import { CommandModule } from '../command/command.module';

@Module({
  controllers: [VersionControlController],
  providers: [VersionControlService],
  imports: [CommandModule],
})
export class VersionControlModule {}
