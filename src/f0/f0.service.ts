import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateF0Dto } from './dto/create-f0.dto';
import { UpdateF0Dto } from './dto/update-f0.dto';
import { F0 } from './f0.entity';

@Injectable()
export class F0Service {
  constructor(
    @InjectRepository(F0)
    private readonly f0Repo: Repository<F0>,
    private readonly userService: UserService,
  ) {}
  async findAll() {
    return await this.f0Repo.find();
  }
  async findOne(id: number) {
    return await this.f0Repo.findOne(id);
  }

  async create(createF0Dto: CreateF0Dto) {
    const { email, password } = createF0Dto;
    const user = await this.userService.create({ email, password }, 'f0');
    return await this.f0Repo.save({ ...createF0Dto, user });
  }

  async update(id: number, updateF0Dto: UpdateF0Dto) {
    return await this.f0Repo.update(id, updateF0Dto);
  }

  async findOneOrFail(id: number) {
    const f0 = await this.findOne(id);
    if (!f0) throw new NotFoundException();
    return f0;
  }

  async delete(id: number) {
    const f0 = await this.findOneOrFail(id);
    return await this.userService.delete(f0.user.id);
  }
}
