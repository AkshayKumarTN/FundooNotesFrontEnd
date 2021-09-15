import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  ResetPasswordForm!: FormGroup;
  hide = false;

  constructor() { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup(
      {
        Email : new FormControl('',[Validators.required, Validators.pattern('^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'),Validators.minLength(6)]),
      }
    )
  }

  getEmailInvalidMessage() {
    return this.ResetPasswordForm.get("Email")?.hasError('required') ? 'You must enter a value' :
    this.ResetPasswordForm.get("Email")?.hasError('pattern') ? 'Not a valid email' : '';
  }

}
