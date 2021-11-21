import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { F0Service } from 'src/f0/f0.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { AssignF0sDto } from './dto/assign-f0s.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    private readonly userService: UserService,
    private readonly f0Service: F0Service,
  ) {}

  async findAll() {
    return await this.doctorRepo.find();
  }

  async findOne(id: number) {
    return await this.doctorRepo.findOne(id);
  }

  async findOneByUserId(id: number) {
    return await this.doctorRepo
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .where('user.id = :id', { id })
      .getOneOrFail();
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const { email, password } = createDoctorDto;
    const user = await this.userService.create({ email, password }, 'doctor');
    return await this.doctorRepo.save({
      ...createDoctorDto,
      user,
    });
  }

  async approve(id: number) {
    return await this.doctorRepo.update(id, { status: 'active' });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorRepo.update(id, updateDoctorDto);
  }

  async assignF0s(doctorId: number, assignF0sDto: AssignF0sDto) {
    const doctor = await this.findOneOrFail(doctorId);
    const { f0s } = assignF0sDto;
    return await Promise.all(
      f0s.map(async (f0) => {
        const f0Id = f0 as unknown as number;
        return await this.f0Service.assignDoctor(f0Id, doctor);
      }),
    );
  }

  async findOneOrFail(id: number) {
    const doctor = await this.findOne(id);
    if (!doctor) throw new NotFoundException();
    return doctor;
  }

  async delete(id: number) {
    const doctor = await this.findOneOrFail(id);
    return await this.userService.delete(doctor.user.id);
  }

  async deleteAll() {
    return await this.doctorRepo.delete({});
  }
}
