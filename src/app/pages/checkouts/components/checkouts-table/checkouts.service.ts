import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { CheckoutsResponseInterface } from './checkouts-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { CheckoutsInterface } from './checkouts.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CheckoutsService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}checkout`;
    }


        all = (): Observable<CheckoutsResponseInterface> => {
       return this._http.get(this.endPoint)
           .map((response: Response) => response.json())
           .catch(this.handleError);
      }

      findById = ( id ) : Observable<CheckoutsResponseInterface> => {
       return this._http.get(`${this.endPoint}/${id}`)
           .map((response: Response) => response.json())
           .catch(this.handleError);
      }

      create = ( checkout: CheckoutsInterface ) : Observable<CheckoutsResponseInterface> => {
       return this._http.post(this.endPoint, checkout, { headers: this.headers })
           .map((response: Response) => response.json())
           .catch(this.handleError);
      }


    addCheckouts = (checkouts: CheckoutsInterface): Observable<CheckoutsResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarCheckout`;
        const toAdd = JSON.stringify(checkouts);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface>response.json())
            .catch(this.handleError);
    }

    editCheckouts = (checkouts: CheckoutsInterface): Observable<CheckoutsResponseInterface> =>  {
    
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarCheckout`;
        const toAdd = JSON.stringify(checkouts);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface>response.json())
            .catch(this.handleError);
    }

    getCheckouts = (idCheckout: number): Observable<CheckoutsInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckoutsPorIDCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface>response.json())
            .catch(this.handleError);
    }

    getAllCheckouts = (): Observable<CheckoutsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckouts`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteCheckouts = (id: string): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaCheckouts`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarCheckout = (idCheckout: number): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearCheckout = (idCheckout: number): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarCheckout = (idCheckout: number): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarCheckout = (idCheckout: number): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdCheckout = (idCheckout: number, idEstatusCheckout: number): Observable<CheckoutsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDCheckout`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idcheckout: idCheckout,
            idestatuscheckout: idEstatusCheckout,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCheckoutsPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<CheckoutsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckoutsPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCheckoutsPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<CheckoutsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckoutsPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCheckoutsPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<CheckoutsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckoutsPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerCheckoutsPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<CheckoutsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerCheckoutsPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <CheckoutsInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusCheckouts = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusCheckouts`;
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

    obtenerTipoCheckouts = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoCheckouts`;
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
