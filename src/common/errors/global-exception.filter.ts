import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityPropertyNotFoundError } from 'typeorm';
import { GlobalResponseError } from './global-response.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';

    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case NotFoundException:
        status = (exception as HttpException).getStatus();
        message = (exception as NotFoundException).message;
        code = (exception as HttpException).name;
      case BadRequestException:
        status = (exception as HttpException).getStatus();
        message = (exception as BadRequestException).message;
        code = (exception as HttpException).name;
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case EntityPropertyNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
