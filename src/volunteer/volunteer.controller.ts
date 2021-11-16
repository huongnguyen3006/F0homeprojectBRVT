import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { VolunteerService } from './volunteer.service'
import { Volunteer } from './volunteer.entity';


@Controller('Volunteers')
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

  @Get(':Id')
  get(@Param() params) {
    return this.volunteerService.findOne(params.Id);
  }

  @Post()
  create(@Body() volunteer: Volunteer) {
    return this.volunteerService.create(volunteer);
  }

  @Put()
  update(@Body() volunteer: Volunteer) {
    return this.volunteerService.update(volunteer);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.volunteerService.delete(params.Id);
  }
}

