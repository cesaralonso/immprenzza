import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisos-edit-modal.component.scss')],
  templateUrl: './permisos-edit-modal.component.html'
})

export class PermisosEditModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit, PermisosInterface {

  idPermiso: number;
  acceso: boolean;
  Rol_idRol: number;
  Modulo_idModulo: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  permiso: PermisosInterface = {
    idPermiso: 0,
    acceso: false,
    Rol_idRol: 0,
    Modulo_idModulo: 0,
  };

  idPermisoAC: AbstractControl;
  accesoAC: AbstractControl;
  Rol_idRolAC: AbstractControl;
  Modulo_idModuloAC: AbstractControl;

  constructor(
    private service: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idPermisoAC' : this.id,
      'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Rol_idRolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Modulo_idModuloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.idPermisoAC = this.form.controls['idPermisoAC'];
    this.accesoAC = this.form.controls['accesoAC'];
    this.Rol_idRolAC = this.form.controls['Rol_idRolAC'];
    this.Modulo_idModuloAC = this.form.controls['Modulo_idModuloAC'];
  }

  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PermisosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editPermisos({

          idPermiso: this.idPermiso,
          acceso: this.acceso,
          Rol_idRol: this.Rol_idRol,
          Modulo_idModulo: this.Modulo_idModulo,
          
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getPermisos(): void {
    this.service.getPermisos(this.id)
        .subscribe( data => {
          this.permiso = data[1];
        },
        error => console.log(error),
        () => console.log('Get permiso complete'));
  }

}
