import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerService } from './volunteer.service';

describe('VolunteerService', () => {
  let service: VolunteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerService],
    }).compile();

    service = module.get<VolunteerService>(VolunteerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
