import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
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
    const { email, password } = createVolunteerDto;
    const user = await this.userService.create(
      { email, password },
      'volunteer',
    );
    return await this.volunteerRepo.save({ ...createVolunteerDto, user });
  }

  async update(id: number, updateVolunteerDto: UpdateVolunteerDto) {
    return await this.volunteerRepo.update(id, updateVolunteerDto);
  }

  async findOneOrFail(id: number) {
    const volunteer = await this.findOne(id);
    if (!volunteer) throw new NotFoundException();
    return volunteer;
  }

  async delete(id: number) {
    const volunteer = await this.findOneOrFail(id);
    return await this.userService.delete(volunteer.user.id);
  }
}
