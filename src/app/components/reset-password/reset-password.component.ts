import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserServiceService} from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm!: FormGroup;
  hide1 = true;
  hide2 = true;

  constructor(
    private userService : UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup(
      {
        Password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\W\\w*\\W)(?!.*\\s).{8,}$'),Validators.minLength(8)]),
        ConfirmPassword : new FormControl('',[Validators.required]),
      }
    )
  }

  getPasswordInvalidMessage() {
    if (this.ResetPasswordForm.get("Password")?.hasError("required")) {
      return ("Password is required"); 
    }
    else if (this.ResetPasswordForm.get("Password")?.hasError("minlength")) {
      return "Password must be 8 characters";
    }
    return null;  
  }

  UpdatePassword()
  {
    var data=localStorage.getItem('ForgotPassword');
    var Email=JSON.parse(data!).Email;
    this.userService.UpdatePassword(Email,this.ResetPasswordForm.value).subscribe((result:any) => {
      console.log(result);      
      
      if(result.status == true)
        {
          this.snackBar.open(`${result.message}`, '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });
          this.router.navigateByUrl('/login');
        }
        
    },(error: HttpErrorResponse) => {
      console.log(error.error.message);
      this.snackBar.open(`${error.error.message}`, '', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      if(error.error.message == "Password Reset Unsuccessfull!. Invalid Email!")
      {
        this.router.navigateByUrl('/login');
      }
    });
    
  }

}
