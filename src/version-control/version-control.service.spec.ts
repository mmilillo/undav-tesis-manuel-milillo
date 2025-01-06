import { Test, TestingModule } from '@nestjs/testing';
import { VersionControlService } from './version-control.service';
import { CommandModule } from '../command/command.module';


describe('VersionControlService', () => {
  let service: VersionControlService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [CommandModule],
      providers: [VersionControlService],
    }).compile();

    service = module.get<VersionControlService>(VersionControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
