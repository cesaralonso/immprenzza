import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PuestosService } from './../puestos.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PuestosInterface } from './../puestos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./puestos-add-modal.component.scss')],
  templateUrl: './puestos-add-modal.component.html'
})

export class PuestosAddModalComponent extends DialogComponent<PuestosInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;

  constructor(
    private service: PuestosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this.form = fb.group({
      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

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
        .addPuestos(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
