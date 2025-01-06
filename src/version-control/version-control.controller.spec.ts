import { Test, TestingModule } from '@nestjs/testing';
import { VersionControlController } from './version-control.controller';
import { VersionControlService } from './version-control.service';
import { CommandModule } from '../command/command.module';

describe('VersionControlController', () => {
  let controller: VersionControlController;
  let service: VersionControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommandModule],
      providers: [VersionControlService],
      controllers: [VersionControlController],
    }).compile();

    controller = module.get<VersionControlController>(VersionControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
