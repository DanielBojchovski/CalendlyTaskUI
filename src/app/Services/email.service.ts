import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../Consts';
import { SendEmailRequest } from '../DTOs/Requests/SendEmailRequest';
import { Observable } from 'rxjs';
import { SendEmailResponse } from '../DTOs/Responses/SendEmailResponse';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  emailUrl = ApiUrl + "Email/";

  SendEmail(request: SendEmailRequest): Observable<SendEmailResponse> {
    return this.http.post<SendEmailResponse>(this.emailUrl + "SendEmail", request);
  }
}
