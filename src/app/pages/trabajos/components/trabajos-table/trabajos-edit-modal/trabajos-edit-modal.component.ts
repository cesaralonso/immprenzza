import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TrabajosService } from './../trabajos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TrabajosInterface } from './../trabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./trabajos-edit-modal.component.scss')],
  templateUrl: './trabajos-edit-modal.component.html'
})

export class TrabajosEditModalComponent extends DialogComponent<TrabajosInterface, any> implements OnInit, TrabajosInterface {


  idTrabajo: number;
  archivo: string;
  foto: string;
  f_entregaEsperada: string;
  f_entregaReal: string;
  status: string;
  especificaciones: string;
  Trabajo_idTipoTrabajo: number;
  cantidad: number;
  total: number;
  Personal_idPersonal: number;
  Orden_idOrden: number;
  f_recibe: string;


  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  trabajo: TrabajosInterface = {
    idTrabajo: 0,
    archivo: '',
    foto: '',
    f_entregaEsperada: '',
    f_entregaReal: '',
    status: '',
    especificaciones: '',
    Trabajo_idTipoTrabajo: 0,
    cantidad: 0,
    total: 0,
    Personal_idPersonal: 0,
    Orden_idOrden: 0,
    f_recibe: '',

  };

  idTrabajoAC: AbstractControl;
  archivoAC: AbstractControl;
  fotoAC: AbstractControl;
  f_entregaEsperadaAC: AbstractControl;
  f_entregaRealAC: AbstractControl;
  statusAC: AbstractControl;
  especificacionesAC: AbstractControl;
  Trabajo_idTipoTrabajoAC: AbstractControl;
  cantidadAC: AbstractControl;
  totalAC: AbstractControl;
  Personal_idPersonalAC: AbstractControl;
  Orden_idOrdenAC: AbstractControl;
  f_recibeAC: AbstractControl;


  constructor(
    private service: TrabajosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);


    this.form = fb.group({

      'idTrabajoAC' : this.id,
      'archivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fotoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'f_entregaEsperadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'f_entregaRealAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'especificacionesAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Trabajo_idTipoTrabajoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Personal_idPersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Orden_idOrdenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'f_recibeAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idTrabajoAC = this.form.controls['idTrabajoAC'];
    this.archivoAC = this.form.controls['archivoAC'];
    this.fotoAC = this.form.controls['fotoAC'];
    this.f_entregaEsperadaAC = this.form.controls['f_entregaEsperadaAC'];
    this.f_entregaRealAC = this.form.controls['f_entregaRealAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.especificacionesAC = this.form.controls['especificacionesAC'];
    this.Trabajo_idTipoTrabajoAC = this.form.controls['Trabajo_idTipoTrabajoAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.Personal_idPersonalAC = this.form.controls['Personal_idPersonalAC'];
    this.Orden_idOrdenAC = this.form.controls['Orden_idOrdenAC'];
    this.f_recibeAC = this.form.controls['f_recibeAC'];

  }

  ngOnInit() {

  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: TrabajosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editTrabajos({
          idTrabajo: this.idTrabajo,
          archivo: this.archivo,
          foto: this.foto,
          f_entregaEsperada: this.f_entregaEsperada,
          f_entregaReal: this.f_entregaReal,
          status: this.status,
          especificaciones: this.especificaciones,
          Trabajo_idTipoTrabajo: this.Trabajo_idTipoTrabajo,
          cantidad: this.cantidad,
          total: this.total,
          Personal_idPersonal: this.Personal_idPersonal,
          Orden_idOrden: this.Orden_idOrden,
          f_recibe: this.f_recibe,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getTrabajos(): void {
    this.service.getTrabajos(this.id)
        .subscribe( data => {
          this.trabajo = data[1];
        },
        error => console.log(error),
        () => console.log('Get trabajo complete'));
  }

}
