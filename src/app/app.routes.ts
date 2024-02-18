import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SelectUserComponent } from './Components/select-user/select-user.component';
import { ListMeetingsComponent } from './Components/list-meetings/list-meetings.component';
import { BookMeetingComponent } from './Components/book-meeting/book-meeting.component';
import { MakeUserAdminComponent } from './Components/make-user-admin/make-user-admin.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    { path: '', component: SelectUserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'list-meetings/:id/:username', component: ListMeetingsComponent },
    { path: 'book-meeting/:id/:username', component: BookMeetingComponent },
    { path: 'make-admin', component: MakeUserAdminComponent , canActivate: [authGuard],},
];
