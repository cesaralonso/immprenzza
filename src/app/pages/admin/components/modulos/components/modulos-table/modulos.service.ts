import { AuthLocalstorage } from './../../../../../../shared/auth-localstorage.service';
import { ModulosResponseInterface } from './modulos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ModulosInterface } from './modulos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ModulosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}modulo`;
    }

    all = (): Observable<ModulosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<ModulosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( modulo: ModulosInterface ) : Observable<ModulosResponseInterface> => {
   return this._http.post(this.endPoint, modulo, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

    addModulos = (modulos: ModulosInterface): Observable<ModulosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarModulo`;
        const toAdd = JSON.stringify(modulos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editModulos = (modulos: ModulosInterface): Observable<ModulosResponseInterface> =>  {
      
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarModulo`;
        const toAdd = JSON.stringify(modulos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getModulos = (idModulo: number): Observable<ModulosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulosPorIDModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosInterface>response.json())
            .catch(this.handleError);
    }

    getAllModulos = (): Observable<ModulosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ModulosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteModulos = (id: string): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaModulos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarModulo = (idModulo: number): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearModulo = (idModulo: number): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarModulo = (idModulo: number): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarModulo = (idModulo: number): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdModulo = (idModulo: number, idEstatusModulo: number): Observable<ModulosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDModulo`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idmodulo: idModulo,
            idestatusmodulo: idEstatusModulo,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerModulosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ModulosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerModulosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ModulosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerModulosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ModulosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerModulosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ModulosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerModulosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ModulosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusModulos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusModulos`;
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

    obtenerTipoModulos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoModulos`;
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
