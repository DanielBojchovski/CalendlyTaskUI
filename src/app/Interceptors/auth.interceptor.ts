import { HttpInterceptorFn } from '@angular/common/http';
import { JWTService } from '../Services/jwt.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let jwtService = inject(JWTService);

  if(jwtService.isLoggedIn()){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', jwtService.getBearerToken()!)
    });

    return next(authRequest);
  }

  return next(req);
};
