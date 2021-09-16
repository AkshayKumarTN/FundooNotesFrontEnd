import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserServiceService} from 'src/app/Services/UserService/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  RegisterForm!: FormGroup;
  submitted = false;
  hide1 = true;
  hide2 = true;
  isVisible = true;

  constructor(
    private userService : UserServiceService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.RegisterForm = new FormGroup(
      {
        FirstName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'),Validators.minLength(3)]),
        LastName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'),Validators.minLength(3)]),
        Email : new FormControl('',[Validators.required, Validators.pattern('^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'),Validators.minLength(6)]),
        Password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\W\\w*\\W)(?!.*\\s).{8,}$'),Validators.minLength(8)]),
        ConfirmPassword : new FormControl('',[Validators.required]),

      }
    )
  }

  FirstNameInvalidMessage() {
    if (this.RegisterForm.get("FirstName")?.hasError("required"))
      return "First Name is required";
    else if(this.RegisterForm.get('FirstName')?.hasError('pattern'))
    {
      return "First Name should start with Capital letter";
    }
    return null;  
  }
  LastNameInvalidMessage() {
    if (this.RegisterForm.get("LastName")?.hasError("required"))
      return "Last Name is required";
      else if(this.RegisterForm.get('LastName')?.hasError('pattern'))
      {
        return "Last Name should start with Capital letter";
      }  
    return null;    
  }
  getEmailInvalidMessage() {
    return this.RegisterForm.get("Email")?.hasError('required') ? 'You must enter a value' :
    this.RegisterForm.get("Email")?.hasError('pattern') ? 'Not a valid email' : '';
  }
  getPasswordInvalidMessage() {
    if (this.RegisterForm.get("Password")?.hasError("required")) {
      return ("Password is required"); 
    }
    else if (this.RegisterForm.get("Password")?.hasError("minlength")) {
      return "Password must be 8 characters";
    }
    return null;  
  }

  Register()
  {
    this.userService.Register(this.RegisterForm.value).subscribe((result:any) => {
      console.log(result);
      if(result.status == true)
        {

        }
        this.snackBar.open(`${result.message}`, '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
    });
    
  }

}
