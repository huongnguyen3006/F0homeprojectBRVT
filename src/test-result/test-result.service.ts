import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { F0Service } from 'src/f0/f0.service';
import { Repository } from 'typeorm';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { TestResult } from './entities/test-result.entity';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult)
    private readonly repository: Repository<TestResult>,
    private readonly f0Service: F0Service,
  ) {}

  async create(createTestResultDto: CreateTestResultDto) {
    await this.f0Service.findOneOrFail(
      createTestResultDto.f0 as unknown as number,
    );
    return await this.repository.save(createTestResultDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateTestResultDto: UpdateTestResultDto) {
    return await this.repository.update(id, updateTestResultDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
