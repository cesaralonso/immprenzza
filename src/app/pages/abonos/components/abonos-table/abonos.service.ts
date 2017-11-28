import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { AbonosResponseInterface } from './abonos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { AbonosInterface } from './abonos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AbonosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}abono`;
    }

      all = (): Observable<AbonosResponseInterface> => {
     return this._http.get(this.endPoint)
         .map((response: Response) => response.json())
         .catch(this.handleError);
    }

    findById = ( id ) : Observable<AbonosResponseInterface> => {
     return this._http.get(`${this.endPoint}/${id}`)
         .map((response: Response) => response.json())
         .catch(this.handleError);
    }

    create = ( abono: AbonosInterface ) : Observable<AbonosResponseInterface> => {
     return this._http.post(this.endPoint, abono, { headers: this.headers })
         .map((response: Response) => response.json())
         .catch(this.handleError);
    }

    addAbonos = (abonos: AbonosInterface): Observable<AbonosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarAbono`;
        const toAdd = JSON.stringify(abonos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editAbonos = (abonos: AbonosInterface): Observable<AbonosResponseInterface> =>  {
      
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarAbono`;
        const toAdd = JSON.stringify(abonos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getAbonos = (idAbono: number): Observable<AbonosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonosPorIDAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosInterface>response.json())
            .catch(this.handleError);
    }

    getAllAbonos = (): Observable<AbonosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonos`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <AbonosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteAbonos = (id: string): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaAbonos`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarAbono = (idAbono: number): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearAbono = (idAbono: number): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarAbono = (idAbono: number): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarAbono = (idAbono: number): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdAbono = (idAbono: number, idEstatusAbono: number): Observable<AbonosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDAbono`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idabono: idAbono,
            idestatusabono: idEstatusAbono,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerAbonosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<AbonosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerAbonosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<AbonosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerAbonosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<AbonosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerAbonosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<AbonosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerAbonosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <AbonosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusAbonos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusAbonos`;
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

    obtenerTipoAbonos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoAbonos`;
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
