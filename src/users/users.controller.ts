import { Controller } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';

import { User } from './users.entity'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('Task management create a user', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
