import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto);

    const payload = {
      userId: user.id,
    };

    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(login: AuthUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(login.email);

    if (!user) return null;

    const passMatch = await this.usersService.comparePassword(
      login.password,
      user.password,
    );

    if (!passMatch) return null;

    const result = { ...user };

    return result;
  }
}
