import { Max, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { Transform } from 'class-transformer';

@Entity('doctor')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  // @Transform(x => new Date('dd/mm/YYYY'))
  // @Column('text')
  // date: Date;

  @Column({ type: 'text' })
  name: string;

  @Column()
  @Min(1)
  @Max(200)
  age: number;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  phone: string;

  // @Column()
  // Zalo: number;

  @Column({ type: 'text' })
  avatar: string;

  //     @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
  //     @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})
  //      // defining this is also optional because by default,
  //      // the referenced foreign key is named as <column_name>_id or account_id
  //    F0: F0;

  //   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
  //   Doctor: Doctor[];
}
