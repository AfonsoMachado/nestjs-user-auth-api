import { ApiProperty } from '@nestjs/swagger';

export class OkBasicResponseDto {
  @ApiProperty({ description: 'Feedback de resposta' })
  message: string;
}
