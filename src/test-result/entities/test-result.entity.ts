import { F0 } from 'src/f0/f0.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const testTypes = ['quick', 'pcr'];
export type TestType = 'quick' | 'pcr';

@Entity('test_result')
export class TestResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  type: TestType;

  @CreateDateColumn()
  date: Date;

  @Column({
    type: 'boolean',
  })
  isPositive: boolean;

  @Column({
    type: 'text',
  })
  place: string;

  @ManyToOne(() => F0, (f0) => f0.testResults, { onDelete: 'CASCADE' })
  f0: F0;
}
