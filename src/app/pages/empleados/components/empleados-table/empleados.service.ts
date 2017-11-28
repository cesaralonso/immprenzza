import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { EmpleadosResponseInterface } from './empleados-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { EmpleadosInterface } from './empleados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmpleadosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}personal`;
    }

    all = (): Observable<EmpleadosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<EmpleadosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( personal: EmpleadosInterface ) : Observable<EmpleadosResponseInterface> => {
   return this._http.post(this.endPoint, personal, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }


    addEmpleados = (empleados: EmpleadosInterface): Observable<EmpleadosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPersonal`;
        const toAdd = JSON.stringify(empleados);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editEmpleados = (empleados: EmpleadosInterface): Observable<EmpleadosResponseInterface> =>  {

        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPersonal`;
        const toAdd = JSON.stringify(empleados);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getEmpleados = (idPersonal: number): Observable<EmpleadosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleadosPorIDPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface>response.json())
            .catch(this.handleError);
    }

    getAllEmpleados = (): Observable<EmpleadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleados`;

        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());

        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteEmpleados = (id: string): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaEmpleados`;

        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarPersonal = (idPersonal: number): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPersonal = (idPersonal: number): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPersonal = (idPersonal: number): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPersonal = (idPersonal: number): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPersonal = (idPersonal: number, idEstatusPersonal: number): Observable<EmpleadosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPersonal`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idpersonal: idPersonal,
            idestatuspersonal: idEstatusPersonal,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEmpleadosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<EmpleadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleadosPorIDRazonSocialCliente`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEmpleadosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<EmpleadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleadosPorIDRazonSocialContratista`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEmpleadosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<EmpleadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleadosPorIDRazonSocialConstructor`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEmpleadosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<EmpleadosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEmpleadosPorIDRazonSocialAsociado`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <EmpleadosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusEmpleados = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusEmpleados`;
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

    obtenerTipoEmpleados = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoEmpleados`;
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
