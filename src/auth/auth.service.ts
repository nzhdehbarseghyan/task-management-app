import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const user = new User();
    user.username = registerDto.username;
    user.password = registerDto.password;
    user.email = registerDto.email;

    return this.usersService.create(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      return null;
    }

    const payload = { username: user.username, sub: user.id }

    return { accessToken: this.jwtService.sign(payload) }
  }

  async validateUser(username: string, password: string): Promise<User>{
    const user = await this.usersService.findOneBy({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
