import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('text') 
  Email: string;

  @Column('text')
  Password: string;
}
