import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { ClientesResponseInterface } from './clientes-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { ClientesInterface } from './clientes.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClientesService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}cliente`;
    }

    all = (): Observable<ClientesResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<ClientesResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( cliente: ClientesInterface ) : Observable<ClientesResponseInterface> => {
   return this._http.post(this.endPoint, cliente, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

    addClientes = (clientes: ClientesInterface): Observable<ClientesResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarCliente`;
        const toAdd = JSON.stringify(clientes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface>response.json())
            .catch(this.handleError);
    }

    editClientes = (clientes: ClientesInterface): Observable<ClientesResponseInterface> =>  {
    
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarCliente`;
        const toAdd = JSON.stringify(clientes);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface>response.json())
            .catch(this.handleError);
    }

    getClientes = (idCliente: number): Observable<ClientesInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientesPorIDCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesInterface>response.json())
            .catch(this.handleError);
    }

    getAllClientes = (): Observable<ClientesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientes`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <ClientesInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteClientes = (id: string): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaClientes`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarCliente = (idCliente: number): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearCliente = (idCliente: number): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarCliente = (idCliente: number): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarCliente = (idCliente: number): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdCliente = (idCliente: number, idEstatusCliente: number): Observable<ClientesResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcliente: idCliente,
            idestatuscliente: idEstatusCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerClientesPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<ClientesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientesPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerClientesPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<ClientesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientesPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerClientesPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<ClientesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientesPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerClientesPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<ClientesInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerClientesPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <ClientesInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusClientes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusClientes`;
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

    obtenerTipoClientes = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoClientes`;
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
            'proceso': proceso,
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
