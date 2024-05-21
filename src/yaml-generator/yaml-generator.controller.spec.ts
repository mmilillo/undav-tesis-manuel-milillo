import { Test, TestingModule } from '@nestjs/testing';
import { YamlGeneratorController } from './yaml-generator.controller';
import { YamlGeneratorService } from './yaml-generator.service';

describe('YamlGeneratorController', () => {
  let controller: YamlGeneratorController;
  let service: YamlGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YamlGeneratorController],
      providers: [YamlGeneratorService]
    }).compile();

    service = module.get<YamlGeneratorService>(YamlGeneratorService)
    controller = module.get<YamlGeneratorController>(YamlGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
