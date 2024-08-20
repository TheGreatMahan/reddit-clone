import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  registerSuccessMessage: string = '';
  isError: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private activatedRoute = inject(ActivatedRoute);

  loginRequestPayload: LoginRequestPayload = {
    username: '',
    password: '',
  };

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params['registered'] !== undefined && params['registered'] === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });
  }

  login() {
    //@ts-ignore
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    //@ts-ignore
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe((data) => {
      if(data){
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      }else {
        this.isError = true;
      }
    });
  }
}
