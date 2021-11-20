import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateF0Dto } from './dto/create-f0.dto';
import { F0Service } from './f0.service';

@ApiTags('f0')
@Controller('f0s')
export class F0Controller {
  constructor(private readonly f0Service: F0Service) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyF0s(@Request() req: RequestWithUser) {
    const { id } = req.user;
    return this.f0Service.findAllOfDoctorByUserId(id);
  }

  @Get('all')
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
