import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {Doctor} from 'src/doctor/doctor.entity'
import { Transform } from 'class-transformer';

@Entity('f0s')
export class F0 {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'text' })
  Name: string;

  @Column() 
  Age: number;

  @Column({ type: 'text' })
  Add: string;

  @Column()
  Tel: number;

  @Column()
  Zalo: number;


  @Column()
  Don: string;

  @Column('text')
  Symstoms: string;

  @Column()
  DoctorId: number;

//   @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
//   @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})   
//    // defining this is also optional because by default,
//    // the referenced foreign key is named as <column_name>_id or account_id
//  F0: F0;

//   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
//   Doctor: Doctor[];

  @Column()
  Dop: string;

  @Column()
  Note: string;

  @Column()
  UserId: string;

  @Column()
  Exams: string;
}

