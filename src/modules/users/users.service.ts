import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const user = this.usersRepository.create(registerUserDto);
    return this.usersRepository.save(user);
  }

  async findAllUsers(page, limit): Promise<any> {
    const [users, totalItems] = await this.usersRepository.findAndCount({
      where: { isDeleted: false },
      select: [
        'id',
        'name',
        'email',
        'city',
        'isDeleted',
        'createdAt',
        'updatedAt',
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: users,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      pageSize: limit,
    };
  }
}
