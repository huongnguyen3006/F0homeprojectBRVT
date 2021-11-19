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
import { VolunteerService } from './volunteer.service';
import { Volunteer } from './volunteer.entity';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

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
}
