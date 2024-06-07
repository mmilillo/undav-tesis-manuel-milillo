import { Module } from '@nestjs/common';
import { VersionControlService } from './version-control.service';
import { VersionControlController } from './version-control.controller';
import { CommandModule } from 'src/command/command.module';

@Module({
  imports: [CommandModule],
  providers: [VersionControlService],
  controllers: [VersionControlController]
})
export class VersionControlModule {}
