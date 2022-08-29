import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseErrorDto } from '../dto/response-error.dto';

export function UserUnauthorizedError() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Usuário não autenticado ou Token inválido',
      type: ResponseErrorDto,
    }),
  );
}
