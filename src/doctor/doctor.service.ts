import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.doctorRepo.find();
  }

  async findOne(id: number) {
    return await this.doctorRepo.findOne(id);
  }

  async create(createDoctorDto: CreateDoctorDto) {
    const { email, password } = createDoctorDto;
    const user = await this.userService.create({ email, password }, 'f0');
    return await this.doctorRepo.save({ ...createDoctorDto, user });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorRepo.update(id, updateDoctorDto);
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
