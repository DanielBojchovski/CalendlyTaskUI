import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MeetingService } from '../../Services/meeting.service';
import { ToastrService } from 'ngx-toastr';
import { JWTService } from '../../Services/jwt.service';
import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CreateMeetingRequest } from '../../DTOs/Requests/CreateMeetingRequest';
import { JWTModel } from '../../DTOs/Models/JWTModel';

@Component({
  selector: 'app-book-meeting',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './book-meeting.component.html',
  styleUrl: './book-meeting.component.css'
})
export class BookMeetingComponent implements OnInit {

  constructor(private meetingService: MeetingService, 
    private activatedRoute: ActivatedRoute, 
    private toastr: ToastrService,
    private jwtService: JWTService,
    private router: Router){}

  userId: string = "";

  username: string = "";

  request: CreateMeetingRequest = {
    name: "",
    durationInMinutes: 5,
    startDateTime: new Date(),
    reason: "Personal",
    userId: this.userId,
    initiatorUserId: null
  }

  currentDate: Date = new Date();

  token: JWTModel | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(take(1)).subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            this.userId = id;
            this.request.userId = id;
          }
          this.username = params.get("username") ?? "";
        }
      })

      this.token = this.jwtService.decodeToken();
  }

  Save(){
    if(this.request.name.trim() === ""){
      this.toastr.error("Name of meeting is required");
      return;
    }

    if(this.request.durationInMinutes < 5){
      this.toastr.error("Duration can not be less than 5 min");
      return;
    }

    if(this.request.startDateTime === null || this.request.startDateTime === undefined){
      this.toastr.error("Start date is required");
      return;
    }

    if(this.request.reason.trim() === ""){
      this.toastr.error("Reason of meeting is required");
      return;
    }

    if(this.request.userId.trim() === ""){
      this.toastr.error("User id is required");
      return;
    }

    if(this.token !== null){
      this.request.initiatorUserId = this.token.sub;
    }

    this.meetingService.CreateMeeting(this.request).pipe(take(1)).subscribe(x => {
      if(x.isSuccessful){
        this.toastr.success(x.message);
        this.router.navigate([`/list-meetings/${this.userId}/${this.username}`]);
      }
      else{
        this.toastr.error(x.message);
      }
    })
  }
}
