import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { omit } from 'lodash';
import { RegisterUserDto } from './dtos/register-user.dto';
import { User } from '../users/entities/user.entity';
import { RegisteredUserDto } from './dtos/registered-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    const { name, email, password, city } = registerUserDto;
    const hashedPassword = await this.hashPassword(password);
    const user: RegisterUserDto = {
      name,
      email,
      city,
      password: hashedPassword,
    };

    const data: User  = await this.usersService.createUser(user);
    return plainToInstance(RegisteredUserDto, data);
  }
}
