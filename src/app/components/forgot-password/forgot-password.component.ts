import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserServiceService} from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ForgotPasswordForm!: FormGroup;

  constructor(
    private userService : UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup(
      {
        Email : new FormControl('',[Validators.required, Validators.pattern('^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'),Validators.minLength(6)])
      }
    )
  }

  getEmailInvalidMessage() {
    return this.ForgotPasswordForm.get("Email")?.hasError('required') ? 'You must enter a value' :
    this.ForgotPasswordForm.get("Email")?.hasError('pattern') ? 'Not a valid email' : '';
  }

  Next()
  {
    this.userService.Next(this.ForgotPasswordForm.value).subscribe((result:any) => {
      console.log(result);
      
      if(result.status == true)
        {
          this.snackBar.open(`${result.message}`, '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
        var params={
          Email:result.email,
          Token:result.data
        }        
        localStorage.setItem('ForgotPassword',JSON.stringify(params));

          this.router.navigateByUrl('/login');
        }
    },(error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      if(error.error.message == "Invalid Email!")
      {
        this.router.navigateByUrl('/login');
      }
    });
  }

}
