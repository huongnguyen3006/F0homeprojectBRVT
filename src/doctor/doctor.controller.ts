import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service'
import { Doctor } from './doctor.entity'


@Controller('Doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {

  }

//   @Get('/Search?')
//   search(@Query('Doctor') DoctorId: string): Promise<F0> {
//     return this.f0Service.findOneByDoctorId(DoctorId)
//   }

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.doctorService.findOne(params.Id);
  }

  @Post()
  create(@Body() doctor: Doctor) {
    return this.doctorService.create(doctor);
  }

  @Put()
  update(@Body() doctor: Doctor) {
    return this.doctorService.update(doctor);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.doctorService.delete(params.Id);
  }
}

