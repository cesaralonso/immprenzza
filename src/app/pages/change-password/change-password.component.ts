import { ChangePasswordResponseInterface } from './change-password-response.interface';
import { LoginResponseInterface } from './../login/login-response.interface';
import { LoginInterface } from './../login/login.interface';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';
import { Http } from '@angular/http';
import { Configuration } from './../../app.constants';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordsValidator } from '../../theme/validators';
import { ChangePasswordInterface } from './change-password.interface';


@Component({
  selector: 'change-password',
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class ChangePasswordComponent {

  form: FormGroup;
  nicknameauth: AbstractControl;
  usuarioauth: AbstractControl;
  claveauth: AbstractControl;
  idusuario: AbstractControl;
  nuevacontrasena: AbstractControl;
  anteriorcontrasena: AbstractControl;
  password: AbstractControl;
  repetircontrasena: AbstractControl;
  submitted: boolean = false;
  contrasena: AbstractControl;
  contrasenas: FormGroup;

  private _claveauth: string;
  private _usuarioauth: string;
  private _nicknameauth: string;
  private _idusuario: string;
  

  constructor(fb: FormBuilder,
    private http: Http, 
    private configuration: Configuration, 
    private authService: AuthService,
    private service: ChangePasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    ) {

    this._claveauth = this.localStorageService.get('claveauth').toString();
    this._usuarioauth = this.localStorageService.get('usuarioauth').toString();
    this._nicknameauth = this.localStorageService.get('nicknameauth').toString();
    this._idusuario = this.localStorageService.get('idusuario').toString();

    this.form = fb.group({
      'nicknameauth': this._nicknameauth,
      'usuarioauth': this._usuarioauth,
      'claveauth': this._claveauth,
      'idusuario': this._idusuario,
      'contrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'contrasenas': fb.group({
        'nuevacontrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repetircontrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('nuevacontrasena', 'repetircontrasena') })
    });

    this.contrasena = this.form.controls['contrasena'];
    this.contrasenas = <FormGroup> this.form.controls['contrasenas'];
    this.nuevacontrasena = this.contrasenas.controls['nuevacontrasena'];
    this.repetircontrasena = this.contrasenas.controls['repetircontrasena'];

  }

  onSubmit(values: ChangePasswordInterface): void {
    this.submitted = true;
    if (this.form.valid) {

      // Valida usuario contra contraseña anterior del usuario
      const credentials: LoginInterface = {
        nicknameauth: values.nicknameauth,
        claveauth: values.contrasena,
        usuarioauth: values.usuarioauth,
      }

      this.authService
        .login(credentials)
        .subscribe(
            (response: LoginResponseInterface) => this.changePassword(response, values));
    }
  }

  private changePassword(response: LoginResponseInterface, valuesChangePasswordForm: ChangePasswordInterface) {
    if (response.idRespuesta === 0) {
      // Si fue validado el usuario con la contraseña anterior procede con el cambio de contrasena
      const newPassword = {
        nicknameauth: valuesChangePasswordForm.nicknameauth,
        claveauth: valuesChangePasswordForm.claveauth,
        usuarioauth: valuesChangePasswordForm.usuarioauth,
        idusuario: valuesChangePasswordForm.idusuario,
        contrasena: valuesChangePasswordForm.contrasenas.nuevacontrasena,
      }

      this.service
        .ChangePassword(newPassword)
        .subscribe(
            (data: ChangePasswordResponseInterface) => this.showToast(data));

    } else {
      this.toastrService.error(response.mensajeRespuesta);
    }
  }

  private showToast(data: ChangePasswordResponseInterface) {
    if (data.idRespuesta === 0) {
      this.toastrService.success(data.mensajeRespuesta);
      this.router.navigate(['login']);
    } else {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }

}
