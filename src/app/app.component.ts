import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { JWTService } from './Services/jwt.service';
import { CalendlyProfilePicture, LocalStorageAuthTokenName } from '../Consts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'CalendlyTaskUI';

  constructor(public jwtService: JWTService, private router: Router){}

  localStorage: Storage = localStorage;
  CalendlyProfilePictureString = CalendlyProfilePicture;

  LogOut(){
    localStorage.removeItem(LocalStorageAuthTokenName);
    localStorage.removeItem(CalendlyProfilePicture);
    this.router.navigate([""]);
  }
}
