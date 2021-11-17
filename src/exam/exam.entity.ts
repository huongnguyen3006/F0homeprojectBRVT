import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { Transform } from 'class-transformer';

@Entity('exam')
export class Exam {

    @PrimaryGeneratedColumn()
    id: number;
   
    @Column() 
    created_by: number; 

    @Column() 
    f0: string; 

    @Column()
    temperature: number;
  
    @Column() 
    spo2: number;
  
  
    @Column('text')
    symptoms: string;

    @Column('datetime')
    dot: string;
  
    @Column('text')
    prescription: string;
  
    @Column('text')
    note: string;
  
    
  
//     @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
//     @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})   
//      // defining this is also optional because by default,
//      // the referenced foreign key is named as <column_name>_id or account_id
//    F0: F0;
  
  //   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
  //   Doctor: Doctor[];
   
}

