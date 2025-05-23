import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findUsers(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ): any {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(perPage, 10);
    return this.usersService.findAllUsers(pageNumber, pageSize);
  }
}
