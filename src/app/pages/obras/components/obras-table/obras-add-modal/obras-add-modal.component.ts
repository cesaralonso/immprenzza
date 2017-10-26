import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ObrasService } from './../obras.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ObrasInterface } from './../obras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./obras-add-modal.component.scss')],
  templateUrl: './obras-add-modal.component.html'
})

export class ObrasAddModalComponent extends DialogComponent<ObrasInterface, any> implements OnInit {s

  _estatusobras: string[];
  _razonsocialasociado: string[];
  _razonsocialconstructor: string[];
  _razonsocialcontratista: string[];
  _razonsocialcliente: string[];
  _tipoobra: string[];

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  descripcion: AbstractControl;
  direccion: AbstractControl;
  medidasterreno: AbstractControl;
  medidasconstruccion: AbstractControl;
  fechainicio: AbstractControl;
  fechafin: AbstractControl;
  idtipoobra: AbstractControl;
  presupuesto: AbstractControl;
  idrazonsocialcliente: AbstractControl;
  idrazonsocialcontratista: AbstractControl;
  idrazonsocialconstructor: AbstractControl;
  idrazonsocialasociado: AbstractControl;
  posiciongps: AbstractControl;
  idestatusobra: AbstractControl;
  observaciones: AbstractControl;

  private _claveauth: string;
  private _usuarioauth: string;
  private _nicknameauth: string;


  constructor(
    private service: ObrasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);

    this._estatusobras = [];
    this._razonsocialasociado = [];
    this._razonsocialconstructor = [];
    this._razonsocialcontratista = [];
    this._razonsocialcliente = [];
    this._tipoobra = [];

    const credenciales = this.authLocalstorage.getCredentials();
    
        this._claveauth = credenciales.claveauth;
        this._usuarioauth = credenciales.usuarioauth;
        this._nicknameauth = credenciales.nicknameauth;
    

    this.form = fb.group({
      'claveauth': this._claveauth,
      'nicknameauth': this._nicknameauth,
      'usuarioauth': this._usuarioauth,
      'descripcion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'direccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasterreno' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasconstruccion' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechainicio' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechafin' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idtipoobra' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'presupuesto' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialcliente' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialcontratista' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialconstructor' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialasociado' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'posiciongps' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idestatusobra' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'observaciones' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      
    });

    this.descripcion = this.form.controls['descripcion'];
    this.direccion = this.form.controls['direccion'];
    this.medidasterreno = this.form.controls['medidasterreno'];
    this.medidasconstruccion = this.form.controls['medidasconstruccion'];
    this.fechainicio = this.form.controls['fechainicio'];
    this.fechafin = this.form.controls['fechafin'];
    this.idtipoobra = this.form.controls['idtipoobra'];
    this.presupuesto = this.form.controls['presupuesto'];
    this.idrazonsocialcliente = this.form.controls['idrazonsocialcliente'];
    this.idrazonsocialcontratista = this.form.controls['idrazonsocialcontratista'];
    this.idrazonsocialconstructor = this.form.controls['idrazonsocialconstructor'];
    this.idrazonsocialasociado = this.form.controls['idrazonsocialasociado'];
    this.posiciongps = this.form.controls['posiciongps'];
    this.idestatusobra = this.form.controls['idestatusobra'];
    this.observaciones = this.form.controls['observaciones'];
  }


  ngOnInit() {

    // Obtiene Estatus de Obras
    this.service.obtenerEstatusObras()
      .subscribe(
        (data: any) => this._estatusobras = data,
      );

     
    // Obtiene Razones Sociales
    this.service.obtenerRazonesSociales()
      .subscribe(
        (data: any) => {
          this._razonsocialasociado = data;
          this._razonsocialconstructor = data;
          this._razonsocialcontratista = data;
          this._razonsocialcliente = data;
        },
      );

    // Obtiene Tipos de Obras
    this.service.obtenerTipoObras()
      .subscribe(
        (data: any) => {
          this._tipoobra = data;
        },
      );

  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ObrasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .addObras(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
