import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';

@ApiTags('exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.examService.findOne(id);
  }

  // @Patch()
  // update(@Param('id') id: number, @Body() updateExamDto: UpdateExamDto) {
  //   return this.examService.update(id, updateExamDto);
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: number) {
  //   return this.examService.delete(id);
  // }

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  //     //Local Endpoint: http://localhost:3000/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  //   //Remote Endpoint: https://thegreenlab.xyz/Datums/LastHour?SensorType=CO2&DeviceSerialNumber=Serial1
  //   @Get('/Last24Hours?')
  //   filter1(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
  //     return this.datumService.getDatumLast24Hours(sensorType, deviceSerialNumber)
  //   }

  //   //Local Endpoint: http://localhost:3000/Datums/Last7Days?SensorType=CO2&DeviceSerialNumber=Serial1
  //   //Remote Endpoint: https://thegreenlab.xyz/Datums/Last7Days?SensorType=CO2&DeviceSerialNumber=Serial1

  //   @Get('/Last7Days?')
  //   filter2(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
  //     return this.datumService.getDatumLast7Days(sensorType, deviceSerialNumber)
  //   }

  //   //Local Endpoint: http://localhost:3000/Datums/Last30Days?SensorType=CO2&DeviceSerialNumber=Serial1
  //   //Remote Endpoint: https://thegreenlab.xyz/Datums/Last30Days?SensorType=CO2&DeviceSerialNumber=Serial1
  //   @Get('/Last30Days?')
  //   filter3(@Query('SensorType') sensorType: string, @Query('DeviceSerialNumber') deviceSerialNumber: string ): Promise<Datum[]> {
  //     return this.datumService.getDatumLast30Days(sensorType, deviceSerialNumber)
  //   }
}
