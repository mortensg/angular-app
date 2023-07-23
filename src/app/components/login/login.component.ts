import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginDetails } from 'src/app/models/login-details.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error: HttpErrorResponse | undefined;
  errorGettingFakeUser: boolean = false;
  loginForm: FormGroup = this.fb.group(new LoginDetails('', ''));

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  login() {
    if (this.loginForm.valid) {
      if (this.errorGettingFakeUser) {
        this.redirect('errorToken');
      } else {
        this.authService.requestAuth(this.loginForm.value).subscribe({
          next: data => this.redirect(data.token),
          error: (error: HttpErrorResponse) => this.error = error
        });
      }
    }
  }

  redirect(token: string) {
    localStorage.setItem('token', token);
    this.authService.isUserLogged.next(true);
    this.router.navigate(['/dashboard']);
  }

  getRandomUser() {
    this.authService.requestRandomUser().subscribe({
      next: data => this.loginForm.setValue(data),
      error: (error: HttpErrorResponse) => {
        this.error = error;
        this.errorGettingFakeUser = true;
        this.loginForm.patchValue({
          username: 'error',
          password: 'error'
        });
      }
    })
  };
}
