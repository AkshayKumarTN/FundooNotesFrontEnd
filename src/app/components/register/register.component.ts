import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  RegisterForm!: FormGroup;
  submitted = false;
  hide = false;

  constructor() { }


  ngOnInit(): void {
    this.RegisterForm = new FormGroup(
      {
        FirstName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'),Validators.minLength(3)]),
        LastName : new FormControl('',[Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$'),Validators.minLength(3)]),
        Email : new FormControl('',[Validators.required, Validators.pattern('^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'),Validators.minLength(6)]),
        Password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\W\\w*\\W)(?!.*\\s).{8,}$'),Validators.minLength(8)]),
        ConfirmPassword : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\W\\w*\\W)(?!.*\\s).{8,}$'),Validators.minLength(8)]),

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
  ConfirmPasswordInvalidMessage() {
    if (this.RegisterForm.get("ConfirmPassword")?.hasError("required")) {
      return "Password is required";
    }
    else if (this.RegisterForm.get("ConfirmPassword")?.hasError("minlength")) {
      return "Password must be 8 characters";
    }
    else if (this.RegisterForm.get("ConfirmPassword")?.hasError("pattern")) {
      return "Password did not match";
    }
    else if (this.RegisterForm.get("ConfirmPassword") != this.RegisterForm.get("Password"))
    {
      return "Password did not match";
    }
    return null;
  }

}
