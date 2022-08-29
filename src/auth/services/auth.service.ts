import { UsersErrors } from './../../users/errors/users.errors';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthUserResponseDto } from '../dto/auth-user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(authUserDto: AuthUserDto): Promise<AuthUserResponseDto> {
    const user = await this.validateUser(authUserDto);

    if (!user) UsersErrors.userLoginFailed();

    const authData: AuthUserResponseDto = {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign({
        userId: user.id,
      }),
    };

    return authData;
  }

  async validateUser(login: AuthUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(login.email);

    if (!user)
      throw new NotFoundException(
        `Usuário de não encontrado na base de dados.`,
      );

    const passMatch = await this.usersService.comparePassword(
      login.password,
      user.password,
    );

    if (!passMatch) return null;

    const result = { ...user };

    return result;
  }
}
