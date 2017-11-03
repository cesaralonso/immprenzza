import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AbonosService } from './../abonos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { AbonosInterface } from './../abonos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./abonos-edit-modal.component.scss')],
  templateUrl: './abonos-edit-modal.component.html'
})

export class AbonosEditModalComponent extends DialogComponent<AbonosInterface, any> implements OnInit, AbonosInterface {



  idAbono: number;
  fecha: string;
  cantidadAbonada: number;
  Orden_idOrden: number;
  cantidadRestante: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  abono: AbonosInterface = {
    idAbono: 0,
    fecha: '',
    cantidadAbonada: 0,
    Orden_idOrden: 0,
    cantidadRestante: 0,
  };

  idAbonoAC: AbstractControl;
  fechaAC: AbstractControl;
  cantidadAbonadaAC: AbstractControl;
  Orden_idOrdenAC: AbstractControl;
  cantidadRestanteAC: AbstractControl;

  constructor(
    private service: AbonosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idAbonoAC' : this.id,
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidadAbonadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Orden_idOrdenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidadRestanteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idAbonoAC = this.form.controls['idAbonoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.cantidadAbonadaAC = this.form.controls['cantidadAbonadaAC'];
    this.Orden_idOrdenAC = this.form.controls['Orden_idOrdenAC'];
    this.cantidadRestanteAC = this.form.controls['cantidadRestanteAC'];

  }

  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: AbonosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editAbonos({
          idAbono: this.idAbono,
          fecha: this.fecha,
          cantidadAbonada: this.cantidadAbonada,
          Orden_idOrden: this.Orden_idOrden,
          cantidadRestante: this.cantidadRestante,
      
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getAbonos(): void {
    this.service.getAbonos(this.id)
        .subscribe( data => {
          this.abono = data[1];
        },
        error => console.log(error),
        () => console.log('Get abono complete'));
  }

}
