import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPayload } from 'src/auth/interfaces/user-payload';
import { Admin } from 'src/common/decorators/admin.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { F0Service } from 'src/f0/f0.service';
import { Permission } from 'src/permissions/permission.enum';
import { RequirePermissions } from 'src/permissions/require-permissions.decorator';
import { DoctorService } from './doctor.service';
import { AssignF0sDto } from './dto/assign-f0s.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly f0Service: F0Service,
  ) {}

  @Admin()
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Admin()
  @Get(':id')
  get(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @Admin()
  @Get(':id/f0s')
  getDoctorF0s(@Param('id') id: number) {
    return this.f0Service.findAllOfDoctor(id);
  }

  @Get('me/f0s')
  getMyF0s(@RequestUser() user: UserPayload) {
    const { doctorId } = user;
    return this.f0Service.findAllOfDoctor(doctorId);
  }

  @Patch('me')
  update(
    @RequestUser() user: UserPayload,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    const { doctorId } = user;
    return this.doctorService.update(doctorId, updateDoctorDto);
  }

  @Post(':id/f0s')
  assignF0s(@Param('id') id: number, @Body() assignF0sDto: AssignF0sDto) {
    return this.doctorService.assignF0s(id, assignF0sDto);
  }

  @Public()
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
