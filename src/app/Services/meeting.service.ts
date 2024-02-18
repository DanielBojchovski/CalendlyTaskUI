import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../Consts';
import { GetMeetingsForUserRequest } from '../DTOs/Requests/GetMeetingsForUserRequest';
import { GetMeetingsForUserResponse } from '../DTOs/Responses/GetMeetingsForUserResponse';
import { Observable } from 'rxjs';
import { CreateMeetingRequest } from '../DTOs/Requests/CreateMeetingRequest';
import { OperationStatusResponse } from '../DTOs/Responses/OperationStatusResponse';
import { GetUsersRequest } from '../DTOs/Requests/GetUsersRequest';
import { DropDownResponse } from '../DTOs/Responses/DropDownResponse';
import { DeleteMeetingRequest } from '../DTOs/Requests/DeleteMeetingRequest';
import { DeleteMeetingResponse } from '../DTOs/Responses/DeleteMeetingResponse';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  meetingUrl = ApiUrl + "Meeting/";

  GetMeetingsForUser(request: GetMeetingsForUserRequest): Observable<GetMeetingsForUserResponse> {
    return this.http.post<GetMeetingsForUserResponse>(this.meetingUrl + "GetMeetingsForUser", request);
  }

  CreateMeeting(request: CreateMeetingRequest): Observable<OperationStatusResponse> {
    return this.http.post<OperationStatusResponse>(this.meetingUrl + "CreateMeeting", request);
  }

  DeleteMeeting(request: DeleteMeetingRequest): Observable<DeleteMeetingResponse> {
    return this.http.post<DeleteMeetingResponse>(this.meetingUrl + "DeleteMeeting", request);
  }

  GetUsers(request: GetUsersRequest): Observable<DropDownResponse> {
    return this.http.post<DropDownResponse>(this.meetingUrl + "GetUsers", request);
  }
}
