import { F0 } from 'src/f0/f0.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { Transform } from 'class-transformer';

export const doctorStatusList = ['pending', 'active', 'deactivated'];
export type DoctorStatus = 'pending' | 'active' | 'deactivated';

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

  @OneToMany(() => F0, (f0) => f0.doctor, { onDelete: 'SET NULL' })
  f0s: F0[];

  @Column({ type: 'enum', enum: doctorStatusList, default: 'pending' })
  status: DoctorStatus;

  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;
}
