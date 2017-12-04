import { AuthLocalstorage } from './../../../../../../shared/auth-localstorage.service';
import { PermisosResponseInterface } from './permisos-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { PermisosInterface } from './permisos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisosService {

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
        this.endPoint = `${this._configuration.ServerWithApiUrl}permiso`;
    }

    all = (): Observable<PermisosResponseInterface> => {
   return this._http.get(this.endPoint)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  findById = ( id ) : Observable<PermisosResponseInterface> => {
   return this._http.get(`${this.endPoint}/${id}`)
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

  create = ( permiso: PermisosInterface ) : Observable<PermisosResponseInterface> => {
   return this._http.post(this.endPoint, permiso, { headers: this.headers })
       .map((response: Response) => response.json())
       .catch(this.handleError);
  }

    addPermisos = (permisos: PermisosInterface): Observable<PermisosResponseInterface> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}agregarPermiso`;
        const toAdd = JSON.stringify(permisos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface>response.json())
            .catch(this.handleError);
    }

    editPermisos = (permisos: PermisosInterface): Observable<PermisosResponseInterface> =>  {
      
        this.actionUrl = `${this._configuration.ServerWithApiUrl}modificarPermiso`;
        const toAdd = JSON.stringify(permisos);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface>response.json())
            .catch(this.handleError);
    }

    getPermisos = (idPermiso: number): Observable<PermisosInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisosPorIDPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
        });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosInterface>response.json())
            .catch(this.handleError);
    }

    getAllPermisos = (): Observable<PermisosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisos`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <PermisosInterface[]>response.json())
            .catch(this.handleError);
    }

    deletePermisos = (id: string): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bajaPermisos`;

        const toSend = JSON.stringify({
            'idusuario': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    autorizarPermiso = (idPermiso: number): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}autorizarPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    bloquearPermiso = (idPermiso: number): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}bloquearPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cancelarPermiso = (idPermiso: number): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cancelarPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    finalizarPermiso = (idPermiso: number): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}FinalizarPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    cambiarEstatusPorIdPermiso = (idPermiso: number, idEstatusPermiso: number): Observable<PermisosResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}cambiarEstatusPorIDPermiso`;
        const toAdd = JSON.stringify({
            idpermiso: idPermiso,
            idestatuspermiso: idEstatusPermiso,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisosPorIdRazonSocialCliente = (idRazonSocialCliente: number): Observable<PermisosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisosPorIDRazonSocialCliente`;
        const toAdd = JSON.stringify({
            idrazonsocialcliente: idRazonSocialCliente,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisosPorIdRazonSocialContratista = (idRazonSocialContratista: number): Observable<PermisosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisosPorIDRazonSocialContratista`;
        const toAdd = JSON.stringify({
            idrazonsocialcontratista: idRazonSocialContratista,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisosPorIdRazonSocialConstructor = (idRazonSocialConstructor: number): Observable<PermisosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisosPorIDRazonSocialConstructor`;
        const toAdd = JSON.stringify({
            idrazonsocialconstructor: idRazonSocialConstructor,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerPermisosPorIdRazonSocialAsociado = (idRazonSocialAsociado: number): Observable<PermisosInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerPermisosPorIDRazonSocialAsociado`;
        const toAdd = JSON.stringify({
            idrazonsocialasociado: idRazonSocialAsociado,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <PermisosInterface[]>response.json())
            .catch(this.handleError);
    }

    obtenerEstatusPermisos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerEstatusPermisos`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerRazonesSociales = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRazonesSociales`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    obtenerTipoPermisos = (): Observable<any[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerTipoPermisos`;
        return this._http.get(this.actionUrl, { headers: this.headers })
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
