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
  modalHeader: string;


  form: FormGroup;
  submitted: boolean = false;

  Rol_idRol: AbstractControl;
  usuario: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;

  data: any;

  constructor(private service: UserService,
              fb: FormBuilder,
              private toastrService: ToastrService,
              private localStorageService: LocalStorageService,
              private authLocalstorage: AuthLocalstorage,
              dialogService: DialogService) {
    super(dialogService);
    this._roles = [];

    this.form = fb.group({
      'Rol_idRol': [''],
      'usuario': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.Rol_idRol = this.form.controls['Rol_idRol'];
    this.usuario = this.form.controls['usuario'];
    this.password = this.form.controls['password'];
    this.email = this.form.controls['email'];
  }

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerRoles() {
    // Obtiene Roles de Usuario
    this.service.obtenerRoles()
      .subscribe(
         (data: any) => this._roles = data.result,
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
        .create({
                Rol_idRol: values.Rol_idRol,
                usuario: values.usuario,
                password: values.password,
                email: values.email,
            })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }


}
