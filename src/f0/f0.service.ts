import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/doctor.entity';
import { CreateExamDto } from 'src/exam/dto/create-exam.dto';
import { ExamService } from 'src/exam/exam.service';
import { CreateTestResultDto } from 'src/test-result/dto/create-test-result.dto';
import { TestResultService } from 'src/test-result/test-result.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateF0Dto } from './dto/create-f0.dto';
import { UpdateF0Dto } from './dto/update-f0.dto';
import { F0 } from './f0.entity';

@Injectable()
export class F0Service {
  constructor(
    @InjectRepository(F0)
    private readonly f0Repo: Repository<F0>,
    private readonly userService: UserService,
    private readonly examService: ExamService,
    private readonly testResultService: TestResultService,
  ) {}
  async findAll() {
    return await this.f0Repo.find();
  }
  async findOne(id: number) {
    return await this.f0Repo.findOne(id);
  }

  async create(createF0Dto: CreateF0Dto) {
    return await this.f0Repo.save(createF0Dto);
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
    return await this.f0Repo.delete(id);
  }

  async findAllOfVolunteerByUserId(id: number) {
    const f0s = await this.f0Repo
      .createQueryBuilder('f0')
      .leftJoinAndSelect('f0.testResults', 'testResults')
      .leftJoinAndSelect('f0.exams', 'exams')
      .leftJoin('f0.volunteer', 'volunteer')
      .where('volunteer.user.id = :id', { id })
      .getMany();
    return f0s;
  }

  async findAllOfVolunteerByVolunteerId(id: number) {
    const f0s = await this.f0Repo
      .createQueryBuilder('f0')
      .leftJoin('f0.volunteer', 'volunteer')
      .where('volunteer.id = :id', { id })
      .getMany();
    return f0s;
  }

  async findAllOfDoctorByDoctorId(id: number) {
    const f0s = await this.f0Repo
      .createQueryBuilder('f0')
      .leftJoin('f0.doctor', 'doctor')
      .where('doctor.id = :id', { id })
      .getMany();
    return f0s;
  }

  async findAllOfDoctorByUserId(id: number) {
    const f0s = await this.f0Repo
      .createQueryBuilder('f0')
      .leftJoinAndSelect('f0.testResults', 'testResults')
      .leftJoinAndSelect('f0.exams', 'exams')
      .leftJoin('f0.doctor', 'doctor')
      .where('doctor.user.id = :id', { id })
      .getMany();
    return f0s;
  }

  async assignDoctor(f0Id: number, doctor: Doctor) {
    const f0 = await this.f0Repo.findOne(f0Id);
    if (!f0) return null;
    f0.doctor = doctor;
    await this.f0Repo.save(f0);
    return f0Id;
  }

  async addTestResult(id: number, createTestResultDto: CreateTestResultDto) {
    const f0 = await this.f0Repo.findOneOrFail(id);
    createTestResultDto.f0 = f0;
    return await this.testResultService.create(createTestResultDto);
  }

  async addExam(id: number, createExamDto: CreateExamDto) {
    const f0 = await this.f0Repo.findOneOrFail(id);
    createExamDto.f0 = f0;
    return await this.examService.create(createExamDto);
  }
}
