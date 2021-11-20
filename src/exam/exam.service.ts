import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
  ) {}

  async findAll() {
    return await this.examRepo.find();
  }

  async findOne(id: number) {
    return await this.examRepo.findOne(id);
  }

  async create(createExamDto: CreateExamDto) {
    return await this.examRepo.save(createExamDto);
  }

  async update(
    id: number,
    updateExamDto: UpdateExamDto,
  ): Promise<UpdateResult> {
    return await this.examRepo.update(id, updateExamDto);
  }

  async delete(id: number) {
    return await this.examRepo.delete(id);
  }
}

// async getDatumLastHour(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {

//     const entityManager = getManager();

//     //use convert_tz() function to convert to current vietnam timezone
//     //use date() function to extract only date

//     let sql = ''
//     if (sensorType!=='All'){
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,12`
//     }
//     else{
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,12`
//     }

//     const rawData = entityManager.query(sql)

//     return rawData

//   }

//   async getDatumLast24Hours(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {

//     const entityManager = getManager();

//     //use convert_tz() function to convert to current vietnam timezone
//     //use date() function to extract only date

//     let sql = ''
//     if (sensorType!=='All'){
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,288`
//     }
//     else{
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,288`
//     }

//     const rawData = entityManager.query(sql)

//     return rawData

//   }

//   async getDatumLast7Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {

//     const entityManager = getManager();

//     //use convert_tz() function to convert to current vietnam timezone
//     //use date() function to extract only date

//     let sql = ''
//     if (sensorType!=='All'){
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,2016`
//     }
//     else{
//        sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate from datum
//     where DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,2016`
//     }

//     const rawData = entityManager.query(sql)

//     return rawData

//   }

//   async getDatumLast30Days(sensorType: string, deviceSerialNumber: string): Promise<Datum[]> {

//     const entityManager = getManager();

//     //use convert_tz() function to convert to current vietnam timezone
//     //use date() function to extract only date

//     let sql = `select *, convert_tz(ReceivedDate, '+0:00', '+7:00') as RecordedDate  from datum
//     where SensorType='${sensorType}' and DeviceSerialNumber='${deviceSerialNumber}'
//     order by ReceivedDate DESC limit 0,8640`

//     const rawData = entityManager.query(sql)

//     return rawData

//   }
