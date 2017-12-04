import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { GroupsService } from './../groups.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { GroupsInterface } from './../groups.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./groups-add-modal.component.scss')],
  templateUrl: './groups-add-modal.component.html'
})

export class GroupsAddModalComponent extends DialogComponent<GroupsInterface, any> implements OnInit {

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombre: AbstractControl;

  constructor(
    private service: GroupsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);

    const credenciales = this.authLocalstorage.getCredentials();

    this.form = fb.group({
      'nombre': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.nombre = this.form.controls['nombre'];
  }


  ngOnInit() {}

  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: GroupsInterface): void {
    this.submitted = true;
    if (this.form.valid) {

      this.service
        .create(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

}


















