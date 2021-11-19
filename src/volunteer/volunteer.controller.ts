import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteer } from './volunteer.entity';
import { VolunteerService } from './volunteer.service';

@ApiTags('volunteer')
@Controller('volunteers')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

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
