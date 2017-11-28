import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { TipoTrabajosResponseInterface } from './tipotrabajos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { TipoTrabajosInterface } from './tipotrabajos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TipoTrabajosService {

    private actionUrl: string;
    private headers: Headers;
    private endPoint: string;


    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.endPoint = `${this._configuration.ServerWithApiUrl}tipotrabajo`;
    }

    all = (): Observable<TipoTrabajosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<TipoTrabajosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( tipotrabajo: TipoTrabajosInterface ) : Observable<TipoTrabajosResponseInterface> => {
   return this._http.post(this.endPoint, tipotrabajo, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }


    addTipoTrabajos = (tipotrabajos: TipoTrabajosInterface): Observable<TipoTrabajosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarTipoTrabajo`;
        const toAdd = JSON.stringify(tipotrabajos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editTipoTrabajos = (tipotrabajos: TipoTrabajosInterface): Observable<TipoTrabajosResponseInterface> =>  {
  
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarTipoTrabajo`;
        const toAdd = JSON.stringify(tipotrabajos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getTipoTrabajos = (idTipoTrabajo: number): Observable<TipoTrabajosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajosPorIDTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface>response.json())
            .catch(this.handleError);
    }

    getAllTipoTrabajos = (): Observable<TipoTrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteTipoTrabajos = (id: string): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaTipoTrabajos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarTipoTrabajo = (idTipoTrabajo: number): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearTipoTrabajo = (idTipoTrabajo: number): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarTipoTrabajo = (idTipoTrabajo: number): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarTipoTrabajo = (idTipoTrabajo: number): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdTipoTrabajo = (idTipoTrabajo: number, idEstatusTipoTrabajo: number): Observable<TipoTrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDTipoTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtipotrabajo: idTipoTrabajo,
            idestatustipotrabajo: idEstatusTipoTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoTrabajosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<TipoTrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoTrabajosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<TipoTrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoTrabajosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<TipoTrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoTrabajosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<TipoTrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TipoTrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusTipoTrabajos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusTipoTrabajos`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRazonesSociales`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoTipoTrabajos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTipoTrabajos`;
        const credenciales = this.authLocalstorage.getCredentials();
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    setFile = (archivo: any): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}AgregarArchivo`;
        const toAdd = JSON.stringify(archivo);

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getFiles = (idreferencia: number, proceso: string): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}ObtenerArchivosPorProcesoPorIdReferencia`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            'idreferencia': idreferencia,
            'proceso': proceso
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
