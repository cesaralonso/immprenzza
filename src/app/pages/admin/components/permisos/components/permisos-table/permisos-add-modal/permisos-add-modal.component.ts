import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisos-add-modal.component.scss')],
  templateUrl: './permisos-add-modal.component.html'
})

export class PermisosAddModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


  accesoAC: AbstractControl;
  Rol_idRolAC: AbstractControl;
  Modulo_idModuloAC: AbstractControl;

  constructor(
    private service: PermisosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this.form = fb.group({

      'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Rol_idRolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Modulo_idModuloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

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
        .addPermisos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
