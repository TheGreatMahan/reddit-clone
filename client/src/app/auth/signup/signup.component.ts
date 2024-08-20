import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private authService = inject(AuthService);

  signupRequestPayload: SignupRequestPayload = {
    username: '',
    password: '',
    email: '',
  };

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  signup() {
    //@ts-ignore
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    //@ts-ignore
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    //@ts-ignore
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data =>{
        console.log(data);
      });
  }
}