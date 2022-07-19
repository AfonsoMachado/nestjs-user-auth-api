import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth-user.guard';

export function AuthUser() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}
