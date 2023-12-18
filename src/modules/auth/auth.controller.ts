import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { loginAccessDto } from './dto/login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async login(@Body() user: loginAccessDto) {
    return this.authService.login(user.email, user.password);
  }
}
