import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { F0Service } from 'src/f0/f0.service';
import { DoctorService } from './doctor.service';
import { AssignF0sDto } from './dto/assign-f0s.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly f0Service: F0Service,
  ) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @Get(':id/f0s')
  getDoctorF0s(@Param('id') id: number) {
    return this.f0Service.findAllOfDoctorByDoctorId(id);
  }

  @Post(':id/f0s')
  assignF0s(@Param('id') id: number, @Body() assignF0sDto: AssignF0sDto) {
    return this.doctorService.assignF0s(id, assignF0sDto);
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.doctorService.delete(id);
  }
}
