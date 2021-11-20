import { IsArray, IsNumber } from 'class-validator';
import { F0 } from 'src/f0/f0.entity';
import { Doctor } from '../doctor.entity';

export class AssignF0sDto {
  @IsArray()
  f0s: F0[];
}
