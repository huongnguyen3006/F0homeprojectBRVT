import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { F0Service } from './f0.service';
import { F0 } from './f0.entity';
import { CreateF0Dto } from './dto/create-f0.dto';
import { UpdateF0Dto } from './dto/update-f0.dto';

@Controller('f0s')
export class F0Controller {
  constructor(private readonly f0Service: F0Service) {}

  //   @Get('/Search?')
  //   search(@Query('Doctor') DoctorId: string): Promise<F0> {
  //     return this.f0Service.findOneByDoctorId(DoctorId)
  //   }

  @Get()
  findAll(): Promise<F0[]> {
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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateF0Dto: UpdateF0Dto) {
    return this.f0Service.update(id, updateF0Dto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.f0Service.delete(id);
  }
}
