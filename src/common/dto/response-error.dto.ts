import { ApiProperty } from '@nestjs/swagger';

export class ResponseErrorDto {
  @ApiProperty({ description: 'Número do erro' })
  statusCode: number;

  @ApiProperty({ description: 'Descrição do erro' })
  message: string;

  @ApiProperty({ description: 'Tipo de erro' })
  error: string;
}
