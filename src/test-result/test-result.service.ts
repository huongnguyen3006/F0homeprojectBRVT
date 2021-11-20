import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { TestResult } from './entities/test-result.entity';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult)
    private readonly repository: Repository<TestResult>,
  ) {}

  async create(createTestResultDto: CreateTestResultDto) {
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
