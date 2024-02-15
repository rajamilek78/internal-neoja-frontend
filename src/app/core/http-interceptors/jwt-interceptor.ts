import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from '../services';

import { HttpStatus } from '@app/helpers/constants';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService,
    // private snackBarService: SnackBarService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtReq = request.clone();
    // Pass on the cloned request instead of the original request.
    return next.handle(jwtReq).pipe(
      tap((event: HttpEvent<any>) => {
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          let message = 'Could not process the request. Please try again.';
          if ([HttpStatus.UNAUTHORIZED].indexOf(err.status) !== -1) {
            message = 'Unauthorized access! please login again'
            this.sharedService.logout();
            // location.reload(true);
          }

          if ([HttpStatus.FORBIDDEN].indexOf(err.status) !== -1) {
            message = 'Forbidden'
          }
          else if (err.error && err.error.message && err.error.message.length > 0) {
            message = err.error.message;
          }
          // this.snackBarService.setSnackBarMessage(message);
        }
      })
    );
  }
}
