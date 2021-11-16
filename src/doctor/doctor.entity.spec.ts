import { Doctor } from './doctor.entity';

describe('DoctorEntity', () => {
  it('should be defined', () => {
    expect(new Doctor()).toBeDefined();
  });
});
