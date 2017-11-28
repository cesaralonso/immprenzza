import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { PuestosResponseInterface } from './puestos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { PuestosInterface } from './puestos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PuestosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}puesto`;
    }

    all = (): Observable<PuestosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<PuestosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( puesto: PuestosInterface ) : Observable<PuestosResponseInterface> => {
   return this._http.post(this.endPoint, puesto, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

    addPuestos = (puestos: PuestosInterface): Observable<PuestosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPuesto`;
        const toAdd = JSON.stringify(puestos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPuestos = (puestos: PuestosInterface): Observable<PuestosResponseInterface> =>  {
      
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPuesto`;
        const toAdd = JSON.stringify(puestos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPuestos = (idPuesto: number): Observable<PuestosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestosPorIDPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosInterface>response.json())
            .catch(this.handleError);
    }

    getAllPuestos = (): Observable<PuestosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <PuestosInterface[]>response.json())
            .catch(this.handleError);
    }

    deletePuestos = (id: string): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaPuestos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarPuesto = (idPuesto: number): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPuesto = (idPuesto: number): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPuesto = (idPuesto: number): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPuesto = (idPuesto: number): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPuesto = (idPuesto: number, idEstatusPuesto: number): Observable<PuestosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPuesto`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpuesto: idPuesto,
            idestatuspuesto: idEstatusPuesto,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPuestosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<PuestosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPuestosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<PuestosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPuestosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<PuestosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPuestosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<PuestosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPuestosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PuestosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusPuestos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusPuestos`;
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

    obtenerTipoPuestos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoPuestos`;
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
