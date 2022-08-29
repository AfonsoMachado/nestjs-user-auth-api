import { OkBasicResponseDto } from './../../common/dto/ok-basic-response.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserUnauthorizedError } from '../../common/decorators/user-unauthorized-error.decorator';
import { AuthUser } from '../decorators/auth-user.decorator';
import { AuthUserDto } from '../dto/auth-user.dto';
import { AuthService } from '../services/auth.service';
import { AuthUserResponseDto } from '../dto/auth-user-response.dto';
import { UnfilledFieldsError } from '../../common/decorators/unfilled-fields-error.decorator';
import { UserNotFoundError } from '../../users/decorators/user-unauthorized-error.decorator';

@ApiTags('users-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Realiza a auntenticação de um usuário',
    description: 'Retorna um token referente a autenticação de um usuário',
  })
  @ApiOkResponse({
    description: 'Retorna o token de autenticação de um usuário',
    type: AuthUserResponseDto,
  })
  @UserNotFoundError()
  @UnfilledFieldsError()
  @Post()
  async login(@Body() authUserDto: AuthUserDto): Promise<AuthUserResponseDto> {
    return this.authService.login(authUserDto);
  }

  @AuthUser()
  @ApiOperation({
    summary: 'Testa a validade do token de autenticação do usuário',
  })
  @ApiOkResponse({
    description:
      'Retorna sucesso caso o token de autenticação do usuário seja válido',
    type: OkBasicResponseDto,
  })
  @UserUnauthorizedError()
  @Get('test')
  async test() {
    return { message: 'Success!' };
  }
}
