import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingService } from '../../Services/meeting.service';
import { JWTService } from '../../Services/jwt.service';
import { Router } from '@angular/router';
import { UpdatePermissionRequest } from '../../DTOs/Requests/UpdatePermissionRequest';
import { DropDownItem } from '../../DTOs/Models/DropDownItem';
import { take } from 'rxjs';
import { JWTModel } from '../../DTOs/Models/JWTModel';
import { GetUsersRequest } from '../../DTOs/Requests/GetUsersRequest';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-user-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './make-user-admin.component.html',
  styleUrl: './make-user-admin.component.css'
})
export class MakeUserAdminComponent implements OnInit {

  constructor(private meetingService: MeetingService, 
    private jwtService: JWTService, 
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService) {}

  token: JWTModel | null = null;
  
  updatePermissionRequest: UpdatePermissionRequest = {
    id: ""
  }

  getUsersRequest: GetUsersRequest = {
    id: null
  }

  userOptions: DropDownItem[] = [];

  selectedUserId = "";

  ngOnInit(): void {
    if(this.jwtService.isLoggedIn()){
      this.token = this.jwtService.decodeToken();
      if(this.token){
        this.getUsersRequest.id = this.token.sub;
        this.meetingService.GetUsers(this.getUsersRequest).pipe(take(1)).subscribe(x => {
          this.userOptions = x.list;
        })
      }
    }
  }

  Redirect(){
    if(this.selectedUserId.trim() !== ""){
      this.updatePermissionRequest.id = this.selectedUserId;
      this.authService.MakeAdmin(this.updatePermissionRequest).pipe(take(1)).subscribe(x => {
        if(x.isSucceed){
          this.toastr.success(x.message);
        }
        else{
          this.toastr.error(x.message);
        }
      })
      this.router.navigate(["/"]);
    }
  }
}
