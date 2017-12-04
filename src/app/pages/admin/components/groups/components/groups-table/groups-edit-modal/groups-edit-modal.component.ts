import { GroupsResponseInterface } from './../groups-response.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../../../shared/auth-localstorage.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { GroupsService } from './../groups.service';
import { Modals } from './../../../../../../ui/components/modals/modals.component';
import { GroupsInterface } from './../groups.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./groups-edit-modal.component.scss')],
  templateUrl: './groups-edit-modal.component.html'
})

export class GroupsEditModalComponent extends DialogComponent<GroupsInterface, any> implements OnInit, GroupsInterface {

  idRol: number; 
  nombre: string;

  modalHeader: string;
  id: number;
  item: GroupsInterface;

  data: any;
  
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;

  constructor(
    private service: GroupsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);
    
    this.idRol = 0;
    this.nombre = '';

    this.form = fb.group({
      'nombreAC': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.nombreAC = this.form.controls['nombreAC'];
  }

  ngOnInit() {
    this.service
      .findById(this.id)
      .subscribe(
        (item: GroupsResponseInterface) => this.item = item.result);
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: GroupsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .edit({
          idRol: this.id,
          nombre: this.nombre,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private showToast(data: any, values: GroupsInterface) {
    if (data.success) {
      this.toastrService.success(data.message);
    } else {
      this.toastrService.error(data.message);
    }
  }


}


















