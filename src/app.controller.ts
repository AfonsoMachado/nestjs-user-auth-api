import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus(): any {
    return { status: 'OK' };
  }
}
