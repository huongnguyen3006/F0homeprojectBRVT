import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { Transform } from 'class-transformer';

@Entity('volunteer')
export class Volunteer{

    @PrimaryGeneratedColumn()
    Id: number;
  
    // @Transform(x => new Date('dd/mm/YYYY'))
    // @Column('text')
    // date: Date;

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
    Avatar: string;
  
    
  
//     @ManyToOne(type => F0, F0 => F0.Id,  {eager: false})
//     @JoinColumn({name: "F0_Id", referencedColumnName: "Id"})   
//      // defining this is also optional because by default,
//      // the referenced foreign key is named as <column_name>_id or account_id
//    F0: F0;
  
  //   @OneToMany(type => Doctor, Doctor => Doctor.F0, {eager: true})
  //   Doctor: Doctor[];
   
}

