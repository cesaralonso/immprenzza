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

    idusuario?: 0;
    idrol: 0;
    usuario: '';
    contrasena: '';
    nombre: '';
    email: '';
    telefono: '';
    idstatususuario: 0;
    emailsms: '';
    
    data: any;
    
    _estatususuarios: string[];

    form: FormGroup;
    submitted: boolean = false;
    idrolAC: AbstractControl;
    usuarioAC: AbstractControl;
    contrasenaAC: AbstractControl;
    nombreAC: AbstractControl;
    emailAC: AbstractControl;
    telefonoAC: AbstractControl;
    idstatususuarioAC: AbstractControl;

    constructor( 
        dialogService: DialogService,
        fb: FormBuilder,
        private userService: UserService,
        private toastrService: ToastrService,
        private authLocalstorage: AuthLocalstorage,
    ) {
        super(dialogService);
        this.form = fb.group({     
          'idrolAC': [''],
          'usuarioAC': [''],
          'contrasenaAC': [''],
          'nombreAC': [''],
          'emailAC': [''],
          'telefonoAC': [''],
          'idstatususuarioAC': [''],
        });

        this._roles = [];

        this.idrolAC = this.form.controls['idrolAC'];
        this.usuarioAC = this.form.controls['usuarioAC'];
        this.contrasenaAC = this.form.controls['contrasenaAC'];
        this.nombreAC = this.form.controls['nombreAC'];
        this.emailAC = this.form.controls['emailAC'];
        this.telefonoAC = this.form.controls['telefonoAC'];
        this.idstatususuarioAC = this.form.controls['idstatususuarioAC'];

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
                idusuario: this.idusuario,
                idrol: this.idrol,
                usuario: this.usuario,
                contrasena: this.contrasena,
                nombre: this.nombre,
                email: this.email,
                telefono: this.telefono,
                idstatususuario: this.idstatususuario,
                emailsms: '',
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
