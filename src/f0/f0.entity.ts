import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Doctor } from 'src/doctor/doctor.entity';
import { Transform } from 'class-transformer';
import { TestResult } from 'src/test-result/entities/test-result.entity';

@Entity('f0s')
export class F0 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'text' })
  add: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  zalo: string;

  @Column({ type: 'text', nullable: true })
  dop: string;

  @Column({ type: 'text', nullable: true })
  don: string;

  @Column({ type: 'text', nullable: true })
  symptoms: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'text', nullable: true })
  treatment: string;

  @Column({ type: 'text', nullable: true })
  exams: string;

  @ManyToOne((type) => Doctor, (doctor) => doctor.f0s)
  doctor: Doctor;

  @OneToMany((type) => TestResult, (testResult) => testResult.f0, {
    onDelete: 'CASCADE',
  })
  testResults: TestResult[];
}
