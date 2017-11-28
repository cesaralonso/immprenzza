import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { OrdenesResponseInterface } from './ordenes-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { OrdenesInterface } from './ordenes.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdenesService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}orden`;
    }

    all = (): Observable<OrdenesResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<OrdenesResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( orden: OrdenesInterface ) : Observable<OrdenesResponseInterface> => {
   return this._http.post(this.endPoint, orden, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

    addOrdenes = (ordenes: OrdenesInterface): Observable<OrdenesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarOrden`;
        const toAdd = JSON.stringify(ordenes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editOrdenes = (ordenes: OrdenesInterface): Observable<OrdenesResponseInterface> =>  {
      
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarOrden`;
        const toAdd = JSON.stringify(ordenes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getOrdenes = (idOrden: number): Observable<OrdenesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenesPorIDOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface>response.json())
            .catch(this.handleError);
    }

    getAllOrdenes = (): Observable<OrdenesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenes`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteOrdenes = (id: string): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaOrdenes`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarOrden = (idOrden: number): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearOrden = (idOrden: number): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarOrden = (idOrden: number): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarOrden = (idOrden: number): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdOrden = (idOrden: number, idEstatusOrden: number): Observable<OrdenesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDOrden`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idorden: idOrden,
            idestatusorden: idEstatusOrden,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerOrdenesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<OrdenesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerOrdenesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<OrdenesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerOrdenesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<OrdenesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerOrdenesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<OrdenesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerOrdenesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <OrdenesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusOrdenes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusOrdenes`;
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

    obtenerTipoOrdenes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoOrdenes`;
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
