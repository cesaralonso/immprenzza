import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdenesService } from './../ordenes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { OrdenesInterface } from './../ordenes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordenes-edit-modal.component.scss')],
  templateUrl: './ordenes-edit-modal.component.html'
})

export class OrdenesEditModalComponent extends DialogComponent<OrdenesInterface, any> implements OnInit, OrdenesInterface {

  idOrden: number;
  factura: boolean;
  fecha: string;
  status_avance: string;
  status_pago: string;
  f_limite: string;
  subtotal: number;
  total: number;
  iva: number;
  deuda: number;
  Cliente_idCliente: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  orden: OrdenesInterface = {
    idOrden: 0,
    factura: false,
    fecha: '',
    status_avance: '',
    status_pago: '',
    f_limite: '',
    subtotal: 0,
    total: 0,
    iva: 0,
    deuda: 0,
    Cliente_idCliente: 0,

  };

  idOrdenAC: AbstractControl;
  facturaAC: AbstractControl;
  fechaAC: AbstractControl;
  status_avanceAC: AbstractControl;
  status_pagoAC: AbstractControl;
  f_limiteAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  ivaAC: AbstractControl;
  deudaAC: AbstractControl;
  Cliente_idClienteAC: AbstractControl;

  constructor(
    private service: OrdenesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idOrdenAC' : this.id,
      'facturaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status_avanceAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'status_pagoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'f_limiteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'subtotalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'ivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'deudaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Cliente_idClienteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.idOrdenAC = this.form.controls['idOrdenAC'];
    this.facturaAC = this.form.controls['facturaAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.status_avanceAC = this.form.controls['status_avanceAC'];
    this.status_pagoAC = this.form.controls['status_pagoAC'];
    this.f_limiteAC = this.form.controls['f_limiteAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.ivaAC = this.form.controls['ivaAC'];
    this.deudaAC = this.form.controls['deudaAC'];
    this.Cliente_idClienteAC = this.form.controls['Cliente_idClienteAC'];
  }

  ngOnInit() {

  }


  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: OrdenesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editOrdenes({

          idOrden: this.idOrden,
          factura: this.factura,
          fecha: this.fecha,
          status_avance: this.status_avance,
          status_pago: this.status_pago,
          f_limite: this.f_limite,
          subtotal: this.subtotal,
          total: this.total,
          iva: this.iva,
          deuda: this.deuda,
          Cliente_idCliente: this.Cliente_idCliente,
        
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getOrdenes(): void {
    this.service.getOrdenes(this.id)
        .subscribe( data => {
          this.orden = data[1];
        },
        error => console.log(error),
        () => console.log('Get orden complete'));
  }

}
