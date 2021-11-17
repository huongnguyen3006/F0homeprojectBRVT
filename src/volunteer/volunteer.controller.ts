import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { VolunteerService } from './volunteer.service'
import { Volunteer } from './volunteer.entity';


@Controller('volunteers')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {

  }

//   @Get('/Search?')
//   search(@Query('Doctor') DoctorId: string): Promise<F0> {
//     return this.f0Service.findOneByDoctorId(DoctorId)
//   }

  @Get()
  findAll(): Promise<Volunteer[]> {
    return this.volunteerService.findAll()
  }

  @Get(':id')
  get(@Param() params) {
    return this.volunteerService.findOne(params.id);
  }

  @Post()
  create(@Body() volunteer: Volunteer) {
    return this.volunteerService.create(volunteer);
  }

  @Put()
  update(@Body() volunteer: Volunteer) {
    return this.volunteerService.update(volunteer);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.volunteerService.delete(params.id);
  }
}

