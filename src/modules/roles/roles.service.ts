import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description } = createRoleDto;
    const existingRole = await this.rolesRepository.findOne({
      where: { name },
    });
    if (existingRole) {
      throw new ConflictException(`${name} role already created.`);
    }

    const role = this.rolesRepository.create({
      name,
      description,
    });

    return this.rolesRepository.save(role);
  }

  findRoles(): Promise<Role[]> {
    return this.rolesRepository.find({ where: { isDeleted: false } });
  }

  async findRoleById(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role not found with ID: ${id}`);
    }
    return role;
  }
}
