import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getLoginUser(@Request() req: RequestWithUser) {
    const { id } = req.user;
    console.log(req.user);
    return this.userService.findOneOrFail(id);
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  // @Post()
  // create(@Body() lab: User) {
  //   return this.userService.create(lab);
  // }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    let dbUser = await this.userService.findByEmail(email);
    if (dbUser)
      return new ConflictException('Email already exists').getResponse();
    const hash = await bcrypt.hash(password, 10);
    createUserDto.password = hash;
    return this.userService.create(createUserDto);
  }
}
