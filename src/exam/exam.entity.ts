import { F0 } from 'src/f0/f0.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exam')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'float' })
  spo2: number;

  @Column({ type: 'date' })
  dot: Date;

  @Column({ type: 'text', nullable: true })
  symptoms: string;

  @Column({ type: 'text', nullable: true })
  prescription: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => F0, (f0) => f0.exams, { onDelete: 'CASCADE' })
  f0: F0;
}
