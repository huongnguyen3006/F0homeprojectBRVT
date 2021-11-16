import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { Transform } from 'class-transformer';

@Entity('exam')
export class Exam {

    @PrimaryGeneratedColumn()
    Id: number;
   
    @Column() 
    UserId: number; 

    @Column() 
    F0Id: number; 

    @Column()
    Temperature: number;
  
    @Column() 
    Spo2: number;
  
    @Column({ type: 'text' })
    F0Name: string;
  
    @Column('text')
    Symptoms: string;

    @Column('datetime')
    Dot: string;
  
    @Column('text')
    Prescription: string;
  
    @Column('text')
    Note: string;
  
    
  
//     @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
//     @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})   
//      // defining this is also optional because by default,
//      // the referenced foreign key is named as <column_name>_id or account_id
//    F0: F0;
  
  //   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
  //   Doctor: Doctor[];
   
}

