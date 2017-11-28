import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { TrabajosResponseInterface } from './trabajos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { TrabajosInterface } from './trabajos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrabajosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}trabajo`;
    }

    all = (): Observable<TrabajosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<TrabajosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( trabajo: TrabajosInterface ) : Observable<TrabajosResponseInterface> => {
   return this._http.post(this.endPoint, trabajo, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }
    addTrabajos = (trabajos: TrabajosInterface): Observable<TrabajosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarTrabajo`;
        const toAdd = JSON.stringify(trabajos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editTrabajos = (trabajos: TrabajosInterface): Observable<TrabajosResponseInterface> =>  {
  
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarTrabajo`;
        const toAdd = JSON.stringify(trabajos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getTrabajos = (idTrabajo: number): Observable<TrabajosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajosPorIDTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface>response.json())
            .catch(this.handleError);
    }

    getAllTrabajos = (): Observable<TrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteTrabajos = (id: string): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaTrabajos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarTrabajo = (idTrabajo: number): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearTrabajo = (idTrabajo: number): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarTrabajo = (idTrabajo: number): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarTrabajo = (idTrabajo: number): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdTrabajo = (idTrabajo: number, idEstatusTrabajo: number): Observable<TrabajosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDTrabajo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idtrabajo: idTrabajo,
            idestatustrabajo: idEstatusTrabajo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTrabajosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<TrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTrabajosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<TrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTrabajosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<TrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerTrabajosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<TrabajosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTrabajosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <TrabajosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusTrabajos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusTrabajos`;
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

    obtenerTipoTrabajos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoTrabajos`;
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
