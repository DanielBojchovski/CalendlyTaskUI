import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../Services/meeting.service';
import { JWTService } from '../../Services/jwt.service';
import { JWTModel } from '../../DTOs/Models/JWTModel';
import { GetUsersRequest } from '../../DTOs/Requests/GetUsersRequest';
import { take } from 'rxjs';
import { DropDownItem } from '../../DTOs/Models/DropDownItem';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-user.component.html',
  styleUrl: './select-user.component.css'
})
export class SelectUserComponent implements OnInit {

  constructor(private meetingService: MeetingService, private jwtService: JWTService, private router: Router) {}

  token: JWTModel | null = null;

  request: GetUsersRequest = {
    id: null
  }

  userOptions: DropDownItem[] = [];

  selectedUserId = "";

  ngOnInit(): void {
    if(this.jwtService.isLoggedIn()){
      this.token = this.jwtService.decodeToken();
      if(this.token){
        this.request.id = this.token.sub;
      }
    }

    this.meetingService.GetUsers(this.request).pipe(take(1)).subscribe(x => {
      this.userOptions = x.list;
    })
  }

  Redirect(){
    if(this.selectedUserId.trim() !== ""){
      let user = this.userOptions.find(x => x.id === this.selectedUserId)
      this.router.navigate([`/list-meetings/${this.selectedUserId}/${user!.name}`]);
    }
  }
}
