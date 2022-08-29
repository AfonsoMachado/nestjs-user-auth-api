import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { ResponseErrorDto } from '../dto/response-error.dto';

export function UnfilledFieldsError() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Campos não preenchidos corretamente',
      type: ResponseErrorDto,
    }),
  );
}
