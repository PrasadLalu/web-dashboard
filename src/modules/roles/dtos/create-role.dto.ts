import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  description: string;
}
