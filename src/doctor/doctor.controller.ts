import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { F0Service } from 'src/f0/f0.service';
import { Permission } from 'src/permissions/permission.enum';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
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

  @Get('me/f0s')
  getMyF0s(@Request() req: RequestWithUser) {
    const { doctorId } = req.user;
    return this.f0Service.findAllOfDoctor(doctorId);
  }

  @Get(':id/f0s')
  getDoctorF0s(@Param('id') id: number) {
    return this.f0Service.findAllOfDoctor(id);
  }

  @Post(':id/f0s')
  assignF0s(@Param('id') id: number, @Body() assignF0sDto: AssignF0sDto) {
    return this.doctorService.assignF0s(id, assignF0sDto);
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @RequirePermissions(Permission.ADMIN)
  @Patch(':id/approve')
  approve(@Param('id') id: number) {
    return this.doctorService.approve(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.doctorService.delete(id);
  }
}
