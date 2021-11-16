import { Test, TestingModule } from '@nestjs/testing';
import { F0Service } from './f0.service';

describe('F0Service', () => {
  let service: F0Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [F0Service],
    }).compile();

    service = module.get<F0Service>(F0Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
