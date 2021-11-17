import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.entity'
import * as bcrypt from 'bcryptjs';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  get(@Param() params) {
    return this.userService.findOne(params.id);
  }

  // @Post()
  // create(@Body() lab: User) {
  //   return this.userService.create(lab);
  // }

  @Put()
  update(@Body() lab: User) {
    return this.userService.update(lab);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.userService.delete(params.id);
  }


  //Auth controller
  @Post('/Auth/Register')
  async register(@Body() user: User) {
    let dbUser =  await this.userService.findByEmail(user)
    if (!dbUser) {
      const hash = await bcrypt.hash(user.Password, 10);
      user.Password = hash
  
       return this.userService.create(user);
    }

     
    else
      return {status: 400, message: "Email already exists"}
  }


  @Post('/Auth/Login')
  async login(@Body() user: User) {
    return await this.userService.login(user)
  }

}
