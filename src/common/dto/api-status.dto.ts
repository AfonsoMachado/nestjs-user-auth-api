import { ApiProperty } from '@nestjs/swagger';

export class ApiStatus {
  @ApiProperty({ description: 'OK' })
  status: string;
}
