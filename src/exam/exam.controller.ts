import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ExamService } from './exam.service'
import { Exam } from './exam.entity';


@Controller('Exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {

  }

//   @Get('/Search?')
//   search(@Query('Doctor') DoctorId: string): Promise<F0> {
//     return this.f0Service.findOneByDoctorId(DoctorId)
//   }

  @Get()
  findAll(): Promise<Exam[]> {
    return this.examService.findAll()
  }

  @Get(':Id')
  get(@Param() params) {
    return this.examService.findOne(params.Id);
  }

  @Post()
  create(@Body() exam: Exam) {
    return this.examService.create(exam);
  }

  @Post('/Batch')
  createBatch(@Body() exams: Exam[]) {

    console.log(exams)
    exams.forEach(d => {
      this.examService.create(d);
    });
    return exams;
  }


  @Put()
  update(@Body() exam: Exam) {
    return this.examService.update(exam);
  }

  @Delete(':Id')
  deleteUser(@Param() params) {
    return this.examService.delete(params.Id);
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

