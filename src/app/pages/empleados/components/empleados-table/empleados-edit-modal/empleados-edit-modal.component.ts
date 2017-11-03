import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpleadosService } from './../empleados.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { EmpleadosInterface } from './../empleados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./empleados-edit-modal.component.scss')],
  templateUrl: './empleados-edit-modal.component.html'
})

export class EmpleadosEditModalComponent extends DialogComponent<EmpleadosInterface, any> implements OnInit, EmpleadosInterface {

  idPersonal: number;
  f_ingreso: string;
  frec_nomina: string;
  nomina: number;
  Persona_idPersona: number;
  Puesto_idPuesto: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  personal: EmpleadosInterface = {
    idPersonal: 0,
    f_ingreso: '',
    frec_nomina: '',
    nomina: 0,
    Persona_idPersona: 0,
    Puesto_idPuesto: 0,
  };

  idPersonalAC: AbstractControl;
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
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idPersonalAC' : this.id,
      'f_ingresoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'frec_nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Persona_idPersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Puesto_idPuestoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idPersonalAC = this.form.controls['idPersonalAC'];
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
        .editEmpleados({

          idPersonal: this.idPersonal,
          f_ingreso: this.f_ingreso,
          frec_nomina: this.frec_nomina,
          nomina: this.nomina,
          Persona_idPersona: this.Persona_idPersona,
          Puesto_idPuesto: this.Puesto_idPuesto,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getEmpleados(): void {
    this.service.getEmpleados(this.id)
        .subscribe( data => {
          this.personal = data[1];
        },
        error => console.log(error),
        () => console.log('Get personal complete'));
  }

}
