import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    let validatorMessage = null;
    const exceptionResponse: any = exception.getResponse();
    if (Array.isArray(exceptionResponse?.message)) {
      validatorMessage = exceptionResponse.message[0];
    }

    Logger.error(`${request.method} ${request.url}`, validatorMessage || message);

    response.status(status).json({
      statusCode: status,
      message: validatorMessage || message,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
    });
  }
}
