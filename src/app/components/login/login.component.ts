import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!: FormGroup;
  submitted = false;
  hide = true;
  

  constructor() { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup(
      {
        Email : new FormControl('',[Validators.required, Validators.pattern('^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'),Validators.minLength(6)]),
        Password : new FormControl('',[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\W\\w*\\W)(?!.*\\s).{8,}$'),Validators.minLength(8)]),
      }
    )
  }
  


  getEmailInvalidMessage() {
    return this.LoginForm.get("Email")?.hasError('required') ? 'You must enter a value' :
    this.LoginForm.get("Email")?.hasError('pattern') ? 'Not a valid email' : '';
  }
  getPasswordInvalidMessage() {
    if (this.LoginForm.get("Password")?.hasError("required")) {
      return ("Password is required"); 
    }
    else if (this.LoginForm.get("Password")?.hasError("minlength")) {
      return "Password must be 8 characters";
    }
    return null;  
  }

}
