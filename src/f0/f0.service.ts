import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}
  async findAll(): Promise<F0[]> {
    return await this.f0Repo.find({ relations: ['testResults'] });
  }
  async findOne(id: number): Promise<F0> {
    return await this.f0Repo.findOne(id);
  }

  async findOneOrFail(id: number) {
    const f0 = await this.findOne(id);
    if (!f0) throw new NotFoundException('F0 not found!');
    return f0;
  }
  async create(createF0Dto: CreateF0Dto): Promise<F0> {
    return await this.f0Repo.save(createF0Dto);
  }
  async update(id: number, updateF0Dto: UpdateF0Dto): Promise<UpdateResult> {
    return await this.f0Repo.update(id, updateF0Dto);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.f0Repo.delete(id);
  }
}
