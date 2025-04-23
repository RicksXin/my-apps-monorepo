import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

export class UnLoginException {
  message: string;

  constructor(message?: string) {
    this.message = message;
  }
}

@Catch()
export class UnloginFilter implements ExceptionFilter {
  catch(exception: UnLoginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response
      .json({
        code: HttpStatus.UNAUTHORIZED,
        msg: 'fail',
        data: exception.message || '用户未登录',
      })
      .end();
  }
}
