import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Exibe o status da aplicação',
  })
  @ApiOkResponse({
    description: 'Aplicação executando',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          description: 'OK',
        },
      },
    },
  })
  @Get()
  getStatus(): any {
    return { status: 'OK' };
  }
}
