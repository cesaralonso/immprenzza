import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ObrasService } from './../obras.service';
import { Modals } from './../../../../ui/components/modals/modals.component';
import { ObrasInterface } from './../obras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./obras-edit-modal.component.scss')],
  templateUrl: './obras-edit-modal.component.html'
})

export class ObrasEditModalComponent extends DialogComponent<ObrasInterface, any> implements OnInit, ObrasInterface {

  _estatusobras: string[];
  _razonsocialasociado: string[];
  _razonsocialconstructor: string[];
  _razonsocialcontratista: string[];
  _razonsocialcliente: string[];
  _tipoobra: string[];

  
  idobra: number;
  descripcion: string;
  direccion: string;
  medidasterreno: string;
  medidasconstruccion: string;
  fechainicio: string;
  fechafin: string;
  idtipoobra: number;
  presupuesto: number;
  idrazonsocialcliente: number;
  idrazonsocialcontratista: number;
  idrazonsocialconstructor: number;
  idrazonsocialasociado: number;
  posiciongps: string;
  idestatusobra: number;
  observaciones: string;
  
  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  obra: ObrasInterface = {
    idobra: 0,
    descripcion: '',
    direccion: '',
    medidasterreno: '',
    medidasconstruccion: '',
    fechainicio: '',
    fechafin: '',
    idtipoobra: 0,
    presupuesto: 0,
    idrazonsocialcliente: 0,
    idrazonsocialcontratista: 0,
    idrazonsocialconstructor: 0,
    idrazonsocialasociado: 0,
    posiciongps: '',
    idestatusobra: 0,
    observaciones: '',
  };

  idobraAC: AbstractControl;
  descripcionAC: AbstractControl;
  direccionAC: AbstractControl;
  medidasterrenoAC: AbstractControl;
  medidasconstruccionAC: AbstractControl;
  fechainicioAC: AbstractControl;
  fechafinAC: AbstractControl;
  idtipoobraAC: AbstractControl;
  presupuestoAC: AbstractControl;
  idrazonsocialclienteAC: AbstractControl;
  idrazonsocialcontratistaAC: AbstractControl;
  idrazonsocialconstructorAC: AbstractControl;
  idrazonsocialasociadoAC: AbstractControl;
  posiciongpsAC: AbstractControl;
  idestatusobraAC: AbstractControl;
  observacionesAC: AbstractControl;



  constructor(
    private service: ObrasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
  ) {
    super(dialogService);
    this._estatusobras = [];
    this._razonsocialasociado = [];
    this._razonsocialconstructor = [];
    this._razonsocialcontratista = [];
    this._razonsocialcliente = [];
    this._tipoobra = [];

    this.form = fb.group({
      'idobraAC' : this.id,
      'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'direccionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasterrenoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'medidasconstruccionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechainicioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'fechafinAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idtipoobraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'presupuestoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialclienteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialcontratistaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialconstructorAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idrazonsocialasociadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'posiciongpsAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'idestatusobraAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'observacionesAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.idobraAC = this.form.controls['idobraAC'];
    this.descripcionAC = this.form.controls['descripcionAC'];
    this.direccionAC = this.form.controls['direccionAC'];
    this.medidasterrenoAC = this.form.controls['medidasterrenoAC'];
    this.medidasconstruccionAC = this.form.controls['medidasconstruccionAC'];
    this.fechainicioAC = this.form.controls['fechainicioAC'];
    this.fechafinAC = this.form.controls['fechafinAC'];
    this.idtipoobraAC = this.form.controls['idtipoobraAC'];
    this.presupuestoAC = this.form.controls['presupuestoAC'];
    this.idrazonsocialclienteAC = this.form.controls['idrazonsocialclienteAC'];
    this.idrazonsocialcontratistaAC = this.form.controls['idrazonsocialcontratistaAC'];
    this.idrazonsocialconstructorAC = this.form.controls['idrazonsocialconstructorAC'];
    this.idrazonsocialasociadoAC = this.form.controls['idrazonsocialasociadoAC'];
    this.posiciongpsAC = this.form.controls['posiciongpsAC'];
    this.idestatusobraAC = this.form.controls['idestatusobraAC'];
    this.observacionesAC = this.form.controls['observacionesAC'];
  }

  ngOnInit() {
    // Obtiene una obra
    // this.getObras();
    
    // Obtiene Estatus de Obras
    this.obtenerEstatusObras();

    // Obtiene Razones Sociales
    this.obtenerRazonesSociales();

    // Obtiene Tipos de Obras
    this.obtenerTipoObras();
  }

  obtenerEstatusObras() {
    this.service.obtenerEstatusObras()
      .subscribe(
        (data: any) => this._estatusobras = data,
      );
  }

  obtenerTipoObras() {
    this.service.obtenerTipoObras()
      .subscribe(
        (data: any) => {
          this._tipoobra = data;
        },
      );
  }

  obtenerRazonesSociales() {
    this.service.obtenerRazonesSociales()
      .subscribe(
        (data: any) => {
          this._razonsocialasociado = data;
          this._razonsocialconstructor = data;
          this._razonsocialcontratista = data;
          this._razonsocialcliente = data;
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
        .editObras({
          idobra: this.idobra,
          descripcion: this.descripcion,
          direccion: this.direccion,
          medidasterreno: this.medidasterreno,
          medidasconstruccion: this.medidasconstruccion,
          fechainicio: this.fechainicio,
          fechafin: this.fechafin,
          idtipoobra: this.idtipoobra,
          presupuesto: this.presupuesto,
          idrazonsocialcliente: this.idrazonsocialcliente,
          idrazonsocialcontratista: this.idrazonsocialcontratista,
          idrazonsocialconstructor: this.idrazonsocialconstructor,
          idrazonsocialasociado: this.idrazonsocialasociado,
          posiciongps: this.posiciongps,
          idestatusobra: this.idestatusobra,
          observaciones: this.observaciones,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }

  private getObras(): void {
    this.service.getObras(this.id)
        .subscribe( data => {
          this.obra = data[1]; 
        },
        error => console.log(error),
        () => console.log('Get obra complete'));
  }

}
