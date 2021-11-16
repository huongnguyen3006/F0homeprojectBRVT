import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { F0Service } from './f0.service'
import { F0 } from './f0.entity'


@Controller('F0s')
export class F0Controller {
  constructor(private readonly f0Service: F0Service) {

  }

//   @Get('/Search?')
//   search(@Query('Doctor') DoctorId: string): Promise<F0> {
//     return this.f0Service.findOneByDoctorId(DoctorId)
//   }

  @Get()
  findAll(): Promise<F0[]> {
    return this.f0Service.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.f0Service.findOne(params.Id);
  }

  @Post()
  create(@Body() f0: F0) {
    return this.f0Service.create(f0);
  }

  @Put()
  update(@Body() f0: F0) {
    return this.f0Service.update(f0);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.f0Service.delete(params.Id);
  }
}

