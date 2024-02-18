import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../DTOs/Requests/LoginRequest';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { CalendlyProfilePicture, LocalStorageAuthTokenName } from '../../../Consts';
import { JWTService } from '../../Services/jwt.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private jwtService: JWTService,) {}

  ngOnInit(): void {
    localStorage.removeItem(LocalStorageAuthTokenName);
  }

  request: LoginRequest = {
    userName: "",
    password: ""
  }

  Login(){
    localStorage.removeItem(LocalStorageAuthTokenName);

    if(this.request.userName.trim() === ""){
      this.toastr.error("Username is required");
      return;
    }

    if(this.request.password.trim() === ""){
      this.toastr.error("Password is required");
      return;
    }

    this.authService.Login(this.request).pipe(take(1)).subscribe(x => {
      if(x.isSucceed){
        this.toastr.success("You are logged in");
        localStorage.setItem(CalendlyProfilePicture, `data:image/png;base64,${x.picture}`);
        this.jwtService.saveAuthToken(x.message);
        let state = this.router.lastSuccessfulNavigation?.extras.state;
        if (state) {
          this.router.navigate([state['returnUrl']]);
        }
        else {
          this.router.navigate(["/"]);
        }
      }
      else{
        this.toastr.error(x.message);
      }
    })
  }
}
