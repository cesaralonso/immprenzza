import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./personas-add-modal.component.scss')],
  templateUrl: './personas-add-modal.component.html'
})

export class PersonasAddModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  sexoAC: AbstractControl;
  RFCAC: AbstractControl;
  domicilioAC: AbstractControl;
  telefonoAC: AbstractControl;
  edadAC: AbstractControl;

  constructor(
    private service: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);


    this.form = fb.group({

      'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'sexoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'RFCAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'domicilioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'edadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.nombreAC = this.form.controls['nombreAC'];
    this.sexoAC = this.form.controls['sexoAC'];
    this.RFCAC = this.form.controls['RFCAC'];
    this.domicilioAC = this.form.controls['domicilioAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.edadAC = this.form.controls['edadAC'];
  }


  ngOnInit() {

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PersonasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addPersonas(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
