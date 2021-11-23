import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { CreateF0Dto } from 'src/f0/dto/create-f0.dto';
import { F0Service } from 'src/f0/f0.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { VolunteerService } from './volunteer.service';

@ApiTags('volunteer')
@Controller('volunteers')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly f0Service: F0Service,
  ) {}

  @Admin()
  @Get()
  findAll(@RequestUser() user: UserPayload) {
    return this.volunteerService.findAll();
  }

  @Admin()
  @Get(':id')
  get(@Param('id') id: number) {
    return this.volunteerService.findOne(id);
  }

  @Admin()
  @Get(':id/f0s')
  getVolunteerF0s(@Param('id') id: number) {
    return this.f0Service.findAllOfVolunteer(id);
  }

  @Public()
  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @Get('me/f0s')
  getMyF0s(@RequestUser() user: UserPayload) {
    const { volunteerId } = user;
    return this.f0Service.findAllOfVolunteer(volunteerId);
  }

  @Post('me/f0s')
  addMyF0(@RequestUser() user: UserPayload, @Body() CreateF0Dto: CreateF0Dto) {
    const { volunteerId } = user;
    return this.volunteerService.addF0(volunteerId, CreateF0Dto);
  }

  @Patch('me')
  update(
    @RequestUser() user: UserPayload,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    const { volunteerId } = user;
    return this.volunteerService.update(volunteerId, updateVolunteerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.volunteerService.delete(id);
  }
}
