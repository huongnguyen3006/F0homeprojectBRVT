import { Test, TestingModule } from '@nestjs/testing';
import { F0Controller } from './f0.controller';

describe('F0Controller', () => {
  let controller: F0Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [F0Controller],
    }).compile();

    controller = module.get<F0Controller>(F0Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
