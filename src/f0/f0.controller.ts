import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateF0Dto } from './dto/create-f0.dto';
import { F0Service } from './f0.service';

@ApiTags('f0')
@Controller('f0s')
export class F0Controller {
  constructor(private readonly f0Service: F0Service) {}

  @Get()
  findAll() {
    return this.f0Service.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.f0Service.findOne(id);
  }

  @Post()
  create(@Body() createF0Dto: CreateF0Dto) {
    return this.f0Service.create(createF0Dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateF0Dto: UpdateF0Dto) {
  //   return this.f0Service.update(id, updateF0Dto);
  // }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.f0Service.delete(id);
  }
}
