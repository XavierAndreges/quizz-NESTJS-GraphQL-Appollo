import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadGatewayException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(new HttpException('Not Found', HttpStatus.NOT_FOUND))),
      );
  }
}

