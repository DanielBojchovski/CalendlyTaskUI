import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../Consts';
import { RegisterRequest } from '../DTOs/Requests/RegisterRequest';
import { Observable } from 'rxjs';
import { AuthServiceResponse } from '../DTOs/Responses/AuthServiceResponse';
import { LoginRequest } from '../DTOs/Requests/LoginRequest';
import { UpdatePermissionRequest } from '../DTOs/Requests/UpdatePermissionRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUrl = ApiUrl + "Auth/";

  Register(request: FormData): Observable<AuthServiceResponse> {
    return this.http.post<AuthServiceResponse>(this.authUrl + "Register", request);
  }

  Login(request: LoginRequest): Observable<AuthServiceResponse> {
    return this.http.post<AuthServiceResponse>(this.authUrl + "Login", request);
  }

  MakeAdmin(request: UpdatePermissionRequest): Observable<AuthServiceResponse> {
    return this.http.post<AuthServiceResponse>(this.authUrl + "MakeAdmin", request);
  }
}
