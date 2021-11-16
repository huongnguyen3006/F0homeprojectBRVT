import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { getManager } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(Id: number): Promise<User> {
    return await this.userRepo.findOne(Id)
  }


  async create(task: User): Promise<User> {
    return await this.userRepo.save(task)
  }

  async update(task: User): Promise<UpdateResult> {
    return await this.userRepo.update(task.Id, task);
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.userRepo.delete(Id);
  }

  async findByEmail(user: User): Promise<User> {
    const dbUser = await this.userRepo.findOne({
      where: {
        Email: user.Email,
      },
    });

    return dbUser;

  }

  async findByEmailAndPassword(user: User): Promise<User> {

    const dbUser = await this.userRepo.findOne({
      where: {
        Email: user.Email
      },
    });

    if (!dbUser) return null
    
    const isMatch = await bcrypt.compare( user.Password, dbUser.Password,);

    if (isMatch) 
      return dbUser
    else
      return null;

  }

  async validate(user: User): Promise<User> {
    const dbUser = await this.userRepo.findOne({
      where: {
        Email: user.Email,
      },
    });

    if (!dbUser) {

      throw new NotFoundException(`User ${user.Email} not found`);
    }

    return dbUser;

  }


  async login(user: User): Promise<any | { status: number; message: string }> {
    // const entityManager = getManager();
    // let sql = `Select * from user where Email='${user.Email}' and Password='${user.Password}' limit 1`
    // console.log(sql)
    // return await entityManager.query(sql)

    const dbUser = this.findByEmailAndPassword(user)


    if (dbUser) {
      return dbUser
    }
    else {
      return { status: 400, message: "Wrong password" }
    }


  }


}

