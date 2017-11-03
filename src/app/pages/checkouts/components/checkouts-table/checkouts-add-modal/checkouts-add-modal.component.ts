import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CheckoutsService } from './../checkouts.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { CheckoutsInterface } from './../checkouts.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./checkouts-add-modal.component.scss')],
  templateUrl: './checkouts-add-modal.component.html'
})

export class CheckoutsAddModalComponent extends DialogComponent<CheckoutsInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  entradaAC: AbstractControl;
  salidaAC: AbstractControl;
  tiempo_trabajadoAC: AbstractControl;
  Personal_idPersonalAC: AbstractControl;

  constructor(
    private service: CheckoutsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'entradaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'salidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'tiempo_trabajadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'Personal_idPersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],


    });

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
        .addCheckouts(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
