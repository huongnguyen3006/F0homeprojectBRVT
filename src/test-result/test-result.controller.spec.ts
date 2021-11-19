import { Test, TestingModule } from '@nestjs/testing';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';

describe('TestResultController', () => {
  let controller: TestResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestResultController],
      providers: [TestResultService],
    }).compile();

    controller = module.get<TestResultController>(TestResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
