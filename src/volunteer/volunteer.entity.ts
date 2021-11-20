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

@Entity('volunteer')
export class Volunteer {
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
  avatar: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => F0, (f0) => f0.volunteer, { onDelete: 'SET NULL' })
  f0s: F0[];
}
