import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ClientesService } from './../clientes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ClientesInterface } from './../clientes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./clientes-add-modal.component.scss')],
  templateUrl: './clientes-add-modal.component.html'
})

export class ClientesAddModalComponent extends DialogComponent<ClientesInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  Persona_idPersonaAC: AbstractControl;

  constructor(
    private service: ClientesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this.form = fb.group({
      'Persona_idPersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.Persona_idPersonaAC = this.form.controls['Persona_idPersonaAC'];
  }


  ngOnInit() {

  }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: ClientesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addClientes(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
