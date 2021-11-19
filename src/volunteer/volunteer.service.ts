import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { Volunteer } from './volunteer.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepo: Repository<Volunteer>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    return await this.volunteerRepo.find();
  }

  async findOne(id: number) {
    return await this.volunteerRepo.findOne(id);
  }

  async create(createVolunteerDto: CreateVolunteerDto) {
    return await this.volunteerRepo.save(createVolunteerDto);
  }

  async update(id: number, updateVolunteerDto: UpdateVolunteerDto) {
    return await this.volunteerRepo.update(id, updateVolunteerDto);
  }

  async delete(id: number) {
    return await this.volunteerRepo.delete(id);
  }
}
