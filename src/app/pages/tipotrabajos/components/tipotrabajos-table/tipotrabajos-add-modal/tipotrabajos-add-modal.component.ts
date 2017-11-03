import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipoTrabajosService } from './../tipotrabajos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { TipoTrabajosInterface } from './../tipotrabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tipotrabajos-add-modal.component.scss')],
  templateUrl: './tipotrabajos-add-modal.component.html'
})

export class TipoTrabajosAddModalComponent extends DialogComponent<TipoTrabajosInterface, any> implements OnInit {


  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;


  nombreAC: AbstractControl;
  costoAC: AbstractControl;


  constructor(
    private service: TipoTrabajosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({


      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'costoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.nombreAC = this.form.controls['nombreAC'];
    this.costoAC = this.form.controls['costoAC'];
  }


  ngOnInit() {

    // Obtiene Estatus de TipoTrabajos

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TipoTrabajosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addTipoTrabajos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
