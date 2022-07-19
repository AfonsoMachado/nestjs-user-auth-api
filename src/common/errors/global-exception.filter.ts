import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

interface IError {
  name: string;
  message: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  private loggerError(statusCode: number, error: unknown) {
    this.logger.error(
      `Http Status: ${statusCode} Error Message: ${JSON.stringify(error)}`,
    );
  }

  catch(exception: IError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : exception;

    if (error.name === 'ValidationError' || error instanceof TypeORMError) {
      const errorMessage = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        error: error.name,
      };

      this.loggerError(HttpStatus.BAD_REQUEST, errorMessage);
      return response.status(HttpStatus.BAD_REQUEST).json(errorMessage);
    }

    this.loggerError(statusCode, error);
    return response.status(statusCode).json(error);
  }
}
