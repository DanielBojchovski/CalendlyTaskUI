import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../Services/meeting.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { GetMeetingsForUserRequest } from '../../DTOs/Requests/GetMeetingsForUserRequest';
import { MeetingModel } from '../../DTOs/Models/MeetingModel';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DeleteMeetingRequest } from '../../DTOs/Requests/DeleteMeetingRequest';
import { JWTService } from '../../Services/jwt.service';
import { JWTModel } from '../../DTOs/Models/JWTModel';

@Component({
  selector: 'app-list-meetings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-meetings.component.html',
  styleUrl: './list-meetings.component.css'
})
export class ListMeetingsComponent implements OnInit {

  constructor(private meetingService: MeetingService, 
    private activatedRoute: ActivatedRoute, 
    private datePipe: DatePipe, 
    private toastr: ToastrService,
    private jwtService: JWTService){}

  meetings: MeetingModel[] = [];

  selectedMeeting: MeetingModel | null = null;

  userId: string = "";

  username: string = "";

  token: JWTModel | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.userId = id;
            let request: GetMeetingsForUserRequest = {id: this.userId};
            this.meetingService.GetMeetingsForUser(request).pipe(take(1)).subscribe(x => {
              this.meetings = x.list;
            })
          }
          this.username = params.get("username") ?? "";
        }
      })

      this.token = this.jwtService.decodeToken();
  }
 
  formatDateTimeOffset(date : Date) {
    return this.datePipe.transform(date, 'HH:mm dd-MM-yyyy');
  }

  Delete(){
    if(this.selectedMeeting){
      let getMeetingsForUserRequest: GetMeetingsForUserRequest = {id: this.userId};
      let deleteMeetingRequest: DeleteMeetingRequest = {
        meetingId: this.selectedMeeting.id,
        getMeetingsForUserRequest: getMeetingsForUserRequest
      }
      this.meetingService.DeleteMeeting(deleteMeetingRequest).pipe(take(1)).subscribe(x => {
        if(x.operationStatusResponse.isSuccessful){
          this.toastr.success(x.operationStatusResponse.message);
        }
        else{
          this.toastr.error(x.operationStatusResponse.message);
        }
        this.meetings = x.getMeetingsForUserResponse.list;
      })
    }
  }
}
