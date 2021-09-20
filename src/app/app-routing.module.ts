import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';

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
    { path: 'notes', component: NotesComponent }
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
