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
import { CreateF0Dto } from 'src/f0/dto/create-f0.dto';
import { F0Service } from 'src/f0/f0.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteer } from './volunteer.entity';
import { VolunteerService } from './volunteer.service';

@ApiTags('volunteer')
@Controller('volunteers')
export class VolunteerController {
  constructor(
    private readonly volunteerService: VolunteerService,
    private readonly f0Service: F0Service,
  ) {}

  @Get()
  findAll(): Promise<Volunteer[]> {
    return this.volunteerService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.volunteerService.findOne(id);
  }

  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/f0s')
  getMyF0s(@Request() req: RequestWithUser) {
    const { volunteerId } = req.user;
    return this.f0Service.findAllOfVolunteer(volunteerId);
  }

  @Get(':id/f0s')
  getVolunteerF0s(@Param('id') id: number) {
    return this.f0Service.findAllOfVolunteer(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/f0s')
  addMyF0(@Request() req: RequestWithUser, @Body() CreateF0Dto: CreateF0Dto) {
    const { id } = req.user;
    return this.volunteerService.addF0(id, CreateF0Dto);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateVolunteerDto: UpdateVolunteerDto,
  // ) {
  //   return this.volunteerService.update(id, updateVolunteerDto);
  // }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.volunteerService.delete(id);
  }
}
