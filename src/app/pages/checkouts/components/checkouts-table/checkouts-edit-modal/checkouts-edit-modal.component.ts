import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CheckoutsService } from './../checkouts.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CheckoutsInterface } from './../checkouts.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./checkouts-edit-modal.component.scss')],
  templateUrl: './checkouts-edit-modal.component.html'
})

export class CheckoutsEditModalComponent extends DialogComponent<CheckoutsInterface, any> implements OnInit, CheckoutsInterface {

  idCheckout: number;
  entrada: string;
  salida: string;
  tiempo_trabajado: number;
  Personal_idPersonal: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  checkout: CheckoutsInterface = {
    idCheckout: 0,
    entrada: '',
    salida: '',
    tiempo_trabajado: 0,
    Personal_idPersonal: 0,
  };

  idCheckoutAC: AbstractControl;
  entradaAC: AbstractControl;
  salidaAC: AbstractControl;
  tiempo_trabajadoAC: AbstractControl;
  Personal_idPersonalAC: AbstractControl;

  constructor(
    private service: CheckoutsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);


    this.form = fb.group({

      'idCheckoutAC' : this.id,
      'entradaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'salidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'tiempo_trabajadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Personal_idPersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idCheckoutAC = this.form.controls['idCheckoutAC'];
    this.entradaAC = this.form.controls['entradaAC'];
    this.salidaAC = this.form.controls['salidaAC'];
    this.tiempo_trabajadoAC = this.form.controls['tiempo_trabajadoAC'];
    this.Personal_idPersonalAC = this.form.controls['Personal_idPersonalAC'];

  }

  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: CheckoutsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editCheckouts({

          idCheckout: this.idCheckout,
          entrada: this.entrada,
          salida: this.salida,
          tiempo_trabajado: this.tiempo_trabajado,
          Personal_idPersonal: this.Personal_idPersonal,
        
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getCheckouts(): void {
    this.service.getCheckouts(this.id)
        .subscribe( data => {
          this.checkout = data[1];
        },
        error => console.log(error),
        () => console.log('Get checkout complete'));
  }

}
