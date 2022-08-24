import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';

class Status {
  @ApiProperty({ description: 'OK' })
  status: string;
}

@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Exibe o status da aplicação',
  })
  @ApiOkResponse({
    description: 'Aplicação executando',
    type: Status,
  })
  @Get()
  getStatus(): any {
    return { status: 'OK' };
  }
}
