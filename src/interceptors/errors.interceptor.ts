import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const enum ErrorType {
  MongoServerError = 'MongoServerError',
  BadRequestException = 'BadRequestException',
}

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const msg =
          err?.name === ErrorType.BadRequestException ? err : err?.message;
        return throwError(() => new BadGatewayException(msg));
      }),
    );
  }
}
