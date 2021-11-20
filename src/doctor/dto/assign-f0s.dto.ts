import { IsArray } from 'class-validator';
import { F0 } from 'src/f0/f0.entity';

export class AssignF0sDto {
  @IsArray()
  f0s: F0[];
}
