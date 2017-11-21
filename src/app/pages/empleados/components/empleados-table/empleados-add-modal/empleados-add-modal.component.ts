import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpleadosService } from './../empleados.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EmpleadosInterface } from './../empleados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./empleados-add-modal.component.scss')],
  templateUrl: './empleados-add-modal.component.html'
})

export class EmpleadosAddModalComponent extends DialogComponent<EmpleadosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  f_ingresoAC: AbstractControl;
  frec_nominaAC: AbstractControl;
  nominaAC: AbstractControl;
  Persona_idPersonaAC: AbstractControl;
  Puesto_idPuestoAC: AbstractControl;

  constructor(
    private service: EmpleadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this.form = fb.group({
      'f_ingresoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'frec_nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Persona_idPersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Puesto_idPuestoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.f_ingresoAC = this.form.controls['f_ingresoAC'];
    this.frec_nominaAC = this.form.controls['frec_nominaAC'];
    this.nominaAC = this.form.controls['nominaAC'];
    this.Persona_idPersonaAC = this.form.controls['Persona_idPersonaAC'];
    this.Puesto_idPuestoAC = this.form.controls['Puesto_idPuestoAC'];
  }


  ngOnInit() {
  }

  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EmpleadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addEmpleados(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
