import { PartialType } from '@nestjs/swagger';
import { CreateF0Dto } from './create-f0.dto';

export class UpdateF0Dto extends PartialType(CreateF0Dto) {}
