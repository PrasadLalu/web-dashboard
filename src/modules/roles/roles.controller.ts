import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './entities/role.entity';

@Controller('api/v1/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  findRoles(): Promise<Role[]> {
    return this.rolesService.findRoles();
  }

  @Get('/:id')
  findRoleById(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findRoleById(id);
  }
}
