import { Test, TestingModule } from '@nestjs/testing';
import { VersionControlController } from './version-control.controller';
import { CommandModule } from '../command/command.module';
import { CommandService } from '../command/command.service';

describe('VersionControlController', () => {
  let controller: VersionControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommandModule],
      controllers: [VersionControlController],
    }).compile();

    controller = module.get<VersionControlController>(VersionControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
