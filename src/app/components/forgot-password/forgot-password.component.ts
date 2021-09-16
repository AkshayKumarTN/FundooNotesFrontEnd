import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ForgotPasswordForm!: FormGroup;

  constructor() { }

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

}
