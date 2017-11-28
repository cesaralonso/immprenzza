import { AuthLocalstorage } from './../../../../../../shared/auth-localstorage.service';
import { GroupsResponseInterface } from './groups-response.interface';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { GroupsInterface } from './groups.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Configuration } from '../../../../../../app.constants';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupsService {

    private actionUrl: string;
    private headers: Headers;


    constructor(
        private _http: Http, 
        private _configuration: Configuration, 
        private localStorageService: LocalStorageService,
        private authLocalstorage: AuthLocalstorage ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    addGroups = (groups: GroupsInterface): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}AgregarRol`;
        const toAdd = JSON.stringify(groups);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    editGroups = (groups: GroupsInterface): Observable<any> =>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}ModificarRol`;
        const toAdd = JSON.stringify(groups);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    getGroups = (id: number): Observable<GroupsInterface> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRol`;
        const credenciales = this.authLocalstorage.getCredentials();
        const toAdd = JSON.stringify({
            idrol: id,
        });
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <GroupsResponseInterface[]>response.json())
            .catch(this.handleError);
    }

    getAllGroups = (): Observable<GroupsInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}obtenerRoles`;
       
        const credenciales = JSON.stringify(this.authLocalstorage.getCredentials());
        return this._http.post(this.actionUrl, credenciales, { headers: this.headers })
            .map((response: Response) => <GroupsInterface[]>response.json())
            .catch(this.handleError);
    }

    deleteGroups = (id: string): Observable<GroupsResponseInterface[]> => {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}eliminarRol`;
       
        const credenciales = this.authLocalstorage.getCredentials();
        const toSend = JSON.stringify({
            'idrol': id,
        });

        return this._http.post(this.actionUrl, toSend, { headers: this.headers })
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}


