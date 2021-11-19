import { Doctor } from 'src/doctor/doctor.entity';
import { Exam } from 'src/exam/exam.entity';
import { TestResult } from 'src/test-result/entities/test-result.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('f0s')
export class F0 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phoneNumber: string;

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

  @ManyToOne(() => Doctor, (doctor) => doctor.f0s)
  doctor: Doctor;

  @OneToMany(() => TestResult, (testResult) => testResult.f0)
  testResults: TestResult[];

  @OneToMany(() => Exam, (exam) => exam.f0)
  exams: Exam[];

  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;
}
