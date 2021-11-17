import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {Doctor} from 'src/doctor/doctor.entity'
import { Transform } from 'class-transformer';

@Entity('f0s')
export class F0 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column() 
  age: number;

  @Column({ type: 'text' })
  add: string;

  @Column()
  tel: number;

  @Column()
  zalo: number;


  @Column()
  don: string;

  @Column('text')
  symstoms_st: string;

  @Column()
  treated_by: number;

//   @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
//   @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})   
//    // defining this is also optional because by default,
//    // the referenced foreign key is named as <column_name>_id or account_id
//  F0: F0;

//   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
//   Doctor: Doctor[];

  @Column()
  dop: string;

  @Column()
  note: string;

  @Column()
  treatment: string;

  @Column()
  exams: string;
}

