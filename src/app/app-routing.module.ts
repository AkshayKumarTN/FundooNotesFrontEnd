import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchiveNotesComponent } from './archive-notes/archive-notes.component';
import { RemainderNotesComponent } from './components/remainder-notes/remainder-notes.component';
import { TrashNotesComponent } from './components/trash-notes/trash-notes.component';

var data =localStorage.getItem('ForgotPassword');
var token=JSON.parse(data!).Token;

const routes: Routes = [
  {path : 'register', component: RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : `resetPassword/${token}`, component : ResetPasswordComponent},
  {path: 'forgotPassword', component : ForgotPasswordComponent},
  {path : 'dashboard', component : DashboardComponent,
  children: [

    { path: '', redirectTo: "notes", pathMatch: "full" },
    { path: 'notes', component: NotesComponent },
    {path: 'archive',component: ArchiveNotesComponent},
    { path: 'remainder', component: RemainderNotesComponent },
    {path: 'trash',component: TrashNotesComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
