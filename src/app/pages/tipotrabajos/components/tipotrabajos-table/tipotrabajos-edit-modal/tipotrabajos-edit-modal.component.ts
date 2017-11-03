import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipoTrabajosService } from './../tipotrabajos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TipoTrabajosInterface } from './../tipotrabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./tipotrabajos-edit-modal.component.scss')],
  templateUrl: './tipotrabajos-edit-modal.component.html'
})

export class TipoTrabajosEditModalComponent extends DialogComponent<TipoTrabajosInterface, any> implements OnInit, TipoTrabajosInterface {

  idTipoTrabajo: number;
  nombre: string;
  costo: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  tipotrabajo: TipoTrabajosInterface = {
    idTipoTrabajo: 0,
    nombre: '',
    costo: 0,
  };

  idTipoTrabajoAC: AbstractControl;
  nombreAC: AbstractControl;
  costoAC: AbstractControl;


  constructor(
    private service: TipoTrabajosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idTipoTrabajoAC' : this.id,
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'costoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idTipoTrabajoAC = this.form.controls['idTipoTrabajoAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.costoAC = this.form.controls['costoAC'];

  }

  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: TipoTrabajosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editTipoTrabajos({
          idTipoTrabajo: this.idTipoTrabajo,
          nombre: this.nombre,
          costo: this.costo,

        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getTipoTrabajos(): void {
    this.service.getTipoTrabajos(this.id)
        .subscribe( data => {
          this.tipotrabajo = data[1];
        },
        error => console.log(error),
        () => console.log('Get tipotrabajo complete'));
  }

}
