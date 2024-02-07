import { Test, TestingModule } from '@nestjs/testing';
import { YamlGeneratorService } from './yaml-generator.service';

describe('YamlGeneratorService', () => {
  let service: YamlGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YamlGeneratorService],
    }).compile();

    service = module.get<YamlGeneratorService>(YamlGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
