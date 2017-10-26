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

  idrol: number; 
  rol: string;
  descripcion: string;
  visible: boolean;

  modalHeader: string;
  id: number;
  item: GroupsInterface;

  data: any;
  
  form: FormGroup;
  submitted: boolean = false;

  nicknameauthAC: AbstractControl;
  usuarioauthAC: AbstractControl;
  claveauthAC: AbstractControl;
  idrolAC: AbstractControl;
  rolAC: AbstractControl;
  descripcionAC: AbstractControl;
  visibleAC: AbstractControl;

  private _claveauth: string;
  private _usuarioauth: string;
  private _nicknameauth: string;
  private _idusuario: string;


  constructor(
    private service: GroupsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    
    this.idrol = 0;
    this.rol = '';
    this.descripcion = '';
    this.visible = false;
        
    const credenciales = this.authLocalstorage.getCredentials();

    this._claveauth = credenciales.claveauth;
    this._usuarioauth = credenciales.usuarioauth;
    this._nicknameauth = credenciales.nicknameauth;

    this.form = fb.group({
      'claveauthAC': this._claveauth,
      'nicknameauthAC': this._nicknameauth,
      'usuarioauthAC': this._usuarioauth,
      'idrolAC': this.id,
      'rolAC': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'descripcionAC': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'visibleAC': [''],
    });

    this.rolAC = this.form.controls['rolAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.visibleAC = this.form.controls['visibleAC'];
  }

  ngOnInit() {
    this.service
      .getGroups(this.id)
      .subscribe(
        (item: GroupsInterface) => this.item = item[1]);
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: GroupsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .editGroups({
          claveauth: this._claveauth,
          nicknameauth: this._nicknameauth,
          usuarioauth: this._usuarioauth,
          idrol: this.idrol,
          rol: this.rol,
          descripcion: this.descripcion,
          visible: this.visible
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private showToast(data: any, values: GroupsInterface) {
    if (data.idRespuesta === 0) {

      this.toastrService.success(data.mensajeRespuesta);
    } else {
      this.toastrService.error(data.mensajeRespuesta);
    }
  }


}


















