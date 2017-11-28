import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { UserService } from './../user.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserInterface } from './../user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'edit-service-modal',
    templateUrl: './user-edit-modal.component.html'
})

export class UserEditModalComponent extends DialogComponent<UserInterface, any> implements OnInit, UserInterface {

    _roles: string[];

    idUser?: 0;
    Rol_idRol: 0;
    usuario: '';
    password: '';
    email: '';

    data: any;

    _estatususuarios: string[];

    form: FormGroup;
    submitted: boolean = false;
    Rol_idRolAC: AbstractControl;
    usuarioAC: AbstractControl;
    passwordAC: AbstractControl;
    emailAC: AbstractControl;

    constructor(
        dialogService: DialogService,
        fb: FormBuilder,
        private userService: UserService,
        private toastrService: ToastrService,
        private authLocalstorage: AuthLocalstorage,
    ) {
        super(dialogService);
        this.form = fb.group({
          'Rol_idRolAC': [''],
          'usuarioAC': [''],
          'passwordAC': [''],
          'emailAC': [''],
        });

        this._roles = [];

        this.Rol_idRolAC = this.form.controls['Rol_idRolAC'];
        this.usuarioAC = this.form.controls['usuarioAC'];
        this.passwordAC = this.form.controls['passwordAC'];
        this.emailAC = this.form.controls['emailAC'];

        this._estatususuarios = [];
     }

    ngOnInit() {
      this.obtenerEstatusUsuarios();
      this.obtenerRoles();
    }

    obtenerRoles() {
      // Obtiene Roles de Usuario
      this.userService.obtenerRoles()
        .subscribe(
          (data: any) => this._roles = data,
        );
    }

    obtenerEstatusUsuarios() {
      // Obtiene Estatus de Usuarios
      this.userService.obtenerEstatusUsuarios()
        .subscribe(
          (data: any) => this._estatususuarios = data,
        );
    }

    confirm() {
        this.result = this.data;
        this.close();
    }

    onSubmit(form): void {
      this.submitted = true;
      if (this.form.valid) {
        this.userService
          .editUser({
                idUser: this.idUser,
                Rol_idRol: this.Rol_idRol,
                usuario: this.usuario,
                password: this.password,
                email: this.email,
            })
          .subscribe((data: any) => {
            this.data = data;
            this.confirm();
          });
      }
    }

    private showToast(data: any) {
      if (data.idRespuesta === 0) {
        this.toastrService.success(data.mensajeRespuesta);
        this.close();
      } else {
        this.toastrService.error(data.mensajeRespuesta);
      }
    }

}
