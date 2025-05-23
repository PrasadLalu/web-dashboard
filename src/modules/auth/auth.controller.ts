import { RegisterUserDto } from './dtos/register-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto): any {
    return this.authService.registerUser(registerUserDto);
  }
}
