import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../decorators/auth-user.decorator';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('users-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }

  @AuthUser()
  @Get()
  async test() {
    return 'Success!';
  }
}
