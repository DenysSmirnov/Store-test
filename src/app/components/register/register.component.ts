import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  error: string;
  success: string;
  regForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.regForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z-_0-9]+@[a-zA-Z_]+?\\..+')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]],
      confirmPass: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]],
    });
  }

  ngOnInit() {}

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

  onSubmit() {
    if (this.regForm.get('password').value === this.regForm.get('confirmPass').value) {
      this.authService.doRegister(
        this.regForm.get('email').value, this.regForm.get('password').value)
      .then(() => {
        this.error = '';
        this.success = 'Your account has been created';
        setTimeout(() => {
          this.router.navigateByUrl('/');
          this.regForm.reset();
        }, 2000);
      }, err => {
        // this.regForm.reset();
        this.error = err.message;
        this.success = '';
      });
    } else {
      this.error = 'Passwords do not match';
    }
  }

  getEmailErrorMessage() {
    return this.regForm.get('email').hasError('required') ? 'You must enter a value' :
    this.regForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  getPassErrorMessage() {
    return this.regForm.get('password').hasError('required') ? 'You must enter a value' :
    this.regForm.get('password').hasError('minLength') ? 'Password min length 6 symbols' : '';
  }
  getConfirmPassErrorMessage() {
    return this.regForm.get('confirmPass').hasError('required') ? 'You must enter a value' :
    this.regForm.get('confirmPass').hasError('minLength') ? 'Password min length 6 symbols' : '';
  }

}
