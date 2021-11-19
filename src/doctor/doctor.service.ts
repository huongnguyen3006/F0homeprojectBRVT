import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
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
    return await this.doctorRepo.save(createDoctorDto);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorRepo.update(id, updateDoctorDto);
  }

  async delete(id: number) {
    return await this.doctorRepo.delete(id);
  }
}
