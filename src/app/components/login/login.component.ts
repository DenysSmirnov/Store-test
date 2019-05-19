import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  error: string;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\..+')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]],
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  private passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const hasSymvols = /[#^.|?=@%!+)&(-]/.test(value);

    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && hasSymvols;

    if (!passwordValid) {
     return { invalidPassword: 'Not valid password' };
    }
     return null;
  }

  getEmailErrorMessage() {
    return this.loginForm.get('email').hasError('required') ? 'You must enter a value' :
           this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage() {
    return this.loginForm.get('password').hasError('required') ? 'You must enter a value' :
           this.loginForm.get('password').hasError('minLength') ? 'Password min length 6 symbols' : '';
  }

  signInWithEmail() {
    this.authService.signIn(
      this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .then(() => {
        this.error = '';
        this.router.navigateByUrl('/store');
        this.loginForm.reset();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

}
