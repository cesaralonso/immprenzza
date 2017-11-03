import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ClientesService } from './../clientes.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ClientesInterface } from './../clientes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./clientes-edit-modal.component.scss')],
  templateUrl: './clientes-edit-modal.component.html'
})

export class ClientesEditModalComponent extends DialogComponent<ClientesInterface, any> implements OnInit, ClientesInterface {

  idCliente: number;
  Persona_idPersona: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cliente: ClientesInterface = {
    idCliente: 0,
    Persona_idPersona: 0,
  };

  idClienteAC: AbstractControl;
  Persona_idPersonaAC: AbstractControl;

  constructor(
    private service: ClientesService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    this.form = fb.group({

      'idClienteAC' : this.id,
      'Persona_idPersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],

    });

    this.idClienteAC = this.form.controls['idClienteAC'];
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
        .editClientes({

          idCliente: this.idCliente,
          Persona_idPersona: this.Persona_idPersona,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getClientes(): void {
    this.service.getClientes(this.id)
        .subscribe( data => {
          this.cliente = data[1];
        },
        error => console.log(error),
        () => console.log('Get cliente complete'));
  }

}
