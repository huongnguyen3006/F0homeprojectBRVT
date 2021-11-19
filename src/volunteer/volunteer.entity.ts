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

@Entity('volunteer')
export class Volunteer {
  @PrimaryGeneratedColumn()
  id: number;

  // @Transform(x => new Date('dd/mm/YYYY'))
  // @Column('text')
  // date: Date;

  @Column({ type: 'text' })
  name: string;

  @Column()
  age: number;

  @Column({ type: 'text' })
  address: string;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
