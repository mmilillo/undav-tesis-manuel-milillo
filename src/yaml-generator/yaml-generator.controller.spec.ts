import { Test, TestingModule } from '@nestjs/testing';
import { YamlGeneratorController } from './yaml-generator.controller';

describe('YamlGeneratorController', () => {
  let controller: YamlGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YamlGeneratorController],
    }).compile();

    controller = module.get<YamlGeneratorController>(YamlGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
