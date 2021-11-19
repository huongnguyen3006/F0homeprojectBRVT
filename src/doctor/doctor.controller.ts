import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @Post()
  create(@Body() doctor: Doctor) {
    return this.doctorService.create(doctor);
  }

  @Put()
  update(@Body() doctor: Doctor) {
    return this.doctorService.update(doctor);
  }
}
