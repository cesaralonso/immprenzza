import { UserResponseInterface } from './../admin/components/users/components/usuarios-table/user-response.interface';
import { UserService } from './../admin/components/users/components/usuarios-table/user.service';
import { LoginResponseInterface } from './login-response.interface';
import { LoginInterface } from './login.interface';
import { AuthService } from './../../shared/auth.service';
import { AuthLocalstorage } from './../../shared/auth-localstorage.service';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  items: any;

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  submitted: boolean = false;

  constructor(fb: FormBuilder,
              protected service: AuthService, 
              private authLocalstorage: AuthLocalstorage,
              private toastrService: ToastrService,
              private userService: UserService,
              private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }


  onSubmit(values: LoginInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .login(values)
        .subscribe(
            (response: LoginResponseInterface) => this.showModal(response, values));
    }
  }

  private showModal(response: LoginResponseInterface, credentials: LoginInterface) {
    if (response.success) {
      this.toastrService.success(response.message);
      this.authLocalstorage.setCredentials(credentials, response);
      this.router.navigate(['pages/dashboard']);
    } else {
      this.toastrService.error(response.message);
      this.authLocalstorage.clearAll();
    }
  }

}
