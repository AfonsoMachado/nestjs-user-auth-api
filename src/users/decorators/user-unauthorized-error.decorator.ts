import { ResponseErrorDto } from './../../common/dto/response-error.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

export function UserNotFoundError() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Usuário não encontrado na base de dados.',
      type: ResponseErrorDto,
    }),
  );
}
