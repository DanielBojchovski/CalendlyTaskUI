import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from '../../DTOs/Requests/RegisterRequest';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  request: RegisterRequest = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    picture: null
  }

  uploadedFiles: any[] = [];

  onFileSelected(event: any): void {
    this.uploadedFiles.push(event.target.files[0]);
  }
    
  Register(){

    if(this.request.fullName.trim() === ""){
      this.toastr.error("Full name is required");
      return;
    }
    
    if(this.request.userName.trim() === ""){
      this.toastr.error("Username is required");
      return;
    }

    if(this.request.email.trim() === ""){
      this.toastr.error("Email is required");
      return;
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(this.request.email)){
      this.toastr.error("Invalid email");
      return;
    }

    if(this.request.password.trim() === ""){
      this.toastr.error("Password is required");
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.request.fullName);
    formData.append('userName', this.request.userName);
    formData.append('email', this.request.email);
    formData.append('password', this.request.password);

    if (this.uploadedFiles.length > 0) {
      formData.append('picture', this.uploadedFiles[0]);
    }

    this.authService.Register(formData).pipe(take(1)).subscribe(x => {
      if(x.isSucceed){
        this.toastr.success(`${x.message}. Please log in`);
        this.router.navigate(["/login"]);
      }
      else{
        this.toastr.error(x.message);
      }
    })
  }
}
