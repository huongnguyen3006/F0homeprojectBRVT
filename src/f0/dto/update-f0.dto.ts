import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateF0Dto } from './create-f0.dto';

export class UpdateF0Dto extends PartialType(CreateF0Dto) {}
