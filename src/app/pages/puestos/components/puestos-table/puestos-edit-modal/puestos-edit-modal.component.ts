import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PuestosService } from './../puestos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PuestosInterface } from './../puestos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./puestos-edit-modal.component.scss')],
  templateUrl: './puestos-edit-modal.component.html'
})

export class PuestosEditModalComponent extends DialogComponent<PuestosInterface, any> implements OnInit, PuestosInterface {

  idPuesto: number;
  nombre: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  puesto: PuestosInterface = {
    idPuesto: 0,
    nombre: '',
  };

  idPuestoAC: AbstractControl;
  nombreAC: AbstractControl;

  constructor(
    private service: PuestosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idPuestoAC' : this.id,
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idPuestoAC = this.form.controls['idPuestoAC'];
    this.nombreAC = this.form.controls['nombreAC'];

  }

  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: PuestosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editPuestos({

          idPuesto: this.idPuesto,
          nombre: this.nombre,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getPuestos(): void {
    this.service.getPuestos(this.id)
        .subscribe( data => {
          this.puesto = data[1];
        },
        error => console.log(error),
        () => console.log('Get puesto complete'));
  }

}
