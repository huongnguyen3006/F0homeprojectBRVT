import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import {Doctor} from './doctor.entity'

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepo: Repository <Doctor>,
    ){}
    async findAll(): Promise <Doctor []> {
        return await this.doctorRepo.find()
    };
    async findOne (id: number): Promise<Doctor>{
        return await this.doctorRepo.findOne(id)
    };
    async create (doctor: Doctor): Promise <Doctor> {
        return await this.doctorRepo.save(doctor)
    }
    async update (doctor: Doctor): Promise <UpdateResult> {
        return await this.doctorRepo.update(doctor.id, doctor)
    }
    async delete (id): Promise <DeleteResult> {
        return await this.doctorRepo.delete(id)
}
}

