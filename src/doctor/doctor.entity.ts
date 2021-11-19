import { Max, Min } from 'class-validator';
import { F0 } from 'src/f0/f0.entity';
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

// import { Transform } from 'class-transformer';

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column()
  age: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @OneToMany((type) => F0, (f0) => f0.doctor, { onDelete: 'SET NULL' })
  f0s: F0[];

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
