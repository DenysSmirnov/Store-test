import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  hide = true;
  error: string;
  success: string;
  regForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.regForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\..+')
      ]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.regForm.valid) {
      this.authService.resetPassword(this.regForm.get('email').value)
      .then(() => {
        this.error = '';
        this.success = 'A password reset email has been sent to your email address';
        setTimeout(() => {
          this.authService.logout();
          this.regForm.reset();
        }, 3000);
      }, err => {
        this.error = err.message;
        this.success = '';
      });
    }
  }

  getEmailErrorMessage() {
    return this.regForm.get('email').hasError('required') ? 'You must enter a value' :
    this.regForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
