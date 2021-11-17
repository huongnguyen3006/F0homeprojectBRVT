import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

@Entity('user')
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  // @Column('text') 
  // first_name: string;

  // @Column('text') 
  // last_name: string;

  @Column('text') 
  Email: string;

  @Column('text')
  Password: string;
}
