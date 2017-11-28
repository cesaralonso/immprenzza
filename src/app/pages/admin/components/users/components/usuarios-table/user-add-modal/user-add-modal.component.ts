import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from './../user.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { UserInterface } from './../user.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./user-add-modal.component.scss')],
  templateUrl: './user-add-modal.component.html'
})

export class UserAddModalComponent extends DialogComponent<UserInterface, any> implements OnInit {
  
  _roles: string[];
  _estatususuarios: string[];
  modalHeader: string;


  form: FormGroup;
  submitted: boolean = false;

  idrol: AbstractControl;
  usuario: AbstractControl;
  contrasena: AbstractControl;
  nombre: AbstractControl;
  email: AbstractControl;
  telefono: AbstractControl;
  idstatususuario: AbstractControl;

  data: any;

  constructor(private service: UserService,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage,
              dialogService: DialogService) {
    super(dialogService);
    this._estatususuarios = [];
    this._roles = [];

    this.form = fb.group({
      'idrol': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'usuario': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'contrasena': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefono': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idstatususuario': [''],
    });

    this.idrol = this.form.controls['idrol'];
    this.usuario = this.form.controls['usuario'];
    this.contrasena = this.form.controls['contrasena'];
    this.nombre = this.form.controls['nombre'];
    this.email = this.form.controls['email'];
    this.telefono = this.form.controls['telefono'];
    this.idstatususuario = this.form.controls['idstatususuario'];
  }

  ngOnInit() {
    this.obtenerEstatusUsuarios();
    this.obtenerRoles();
  }
  
  obtenerRoles() {
    // Obtiene Roles de Usuario
    this.service.obtenerRoles()
      .subscribe(
        (data: any) => this._roles = data,
      );
  }

  obtenerEstatusUsuarios() {
    // Obtiene Estatus de Usuarios
    this.service.obtenerEstatusUsuarios()
      .subscribe(
        (data: any) => this._estatususuarios = data,
      );
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: UserInterface): void {
    this.submitted = true;

    if (this.form.valid) {
      this.service
        .addUser({
                idrol: values.idrol,
                usuario: values.usuario,
                contrasena: values.contrasena,
                nombre: values.nombre,
                email: values.email,
                telefono: values.telefono,
                idstatususuario: values.idstatususuario,
                emailsms: '',
            })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }


}


















