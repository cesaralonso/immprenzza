import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TrabajosService } from './../trabajos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TrabajosInterface } from './../trabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./trabajos-add-modal.component.scss')],
  templateUrl: './trabajos-add-modal.component.html'
})

export class TrabajosAddModalComponent extends DialogComponent<TrabajosInterface, any> implements OnInit {


  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


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
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

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
        .addTrabajos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
