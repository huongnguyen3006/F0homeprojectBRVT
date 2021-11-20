import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Transform } from 'class-transformer';

const userRoles = ['f0', 'doctor', 'volunteer', 'admin'];
export type UserRole = 'f0' | 'doctor' | 'volunteer' | 'admin';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    // Unique will be check at application level
    // unique: true,
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  active: boolean;

  @Column({
    type: 'enum',
    enum: userRoles,
    default: 'f0',
  })
  role: UserRole;
}
