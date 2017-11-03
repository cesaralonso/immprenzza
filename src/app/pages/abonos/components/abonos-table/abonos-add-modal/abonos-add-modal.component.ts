import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AbonosService } from './../abonos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { AbonosInterface } from './../abonos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./abonos-add-modal.component.scss')],
  templateUrl: './abonos-add-modal.component.html'
})

export class AbonosAddModalComponent extends DialogComponent<AbonosInterface, any> implements OnInit {


  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cantidadAbonadaAC: AbstractControl;
  fechaAC: AbstractControl;
  cantidadRestanteAC: AbstractControl;
  Orden_idOrdenAC: AbstractControl;

  constructor(
    private service: AbonosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);



    this.form = fb.group({

      'cantidadAbonadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'cantidadRestanteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Orden_idOrdenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.cantidadAbonadaAC = this.form.controls['cantidadAbonadaAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.cantidadRestanteAC = this.form.controls['cantidadRestanteAC'];
    this.Orden_idOrdenAC = this.form.controls['Orden_idOrdenAC'];


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
        .addAbonos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
