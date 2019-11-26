import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Group } from '../models/group';


@Injectable()
export class GroupService {

    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;

    }


    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity != "undefined") {
            this.identity = identity;

        } else {
            this.identity = null;
        }

        return this.identity;


    }

    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;

        } else {
            this.token = null;
        }
        return this.token;
    }

       /*otra ruta para grupos por usuario '/groupsusers/:page?' */
    getGroups(page = null): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());




        return this._http.get(this.url + 'groupsusers/' + page, { headers: headers });

    }

    getListGroups(idgrupo):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.getToken());

        return this._http.get(this.url + 'listusers/' + idgrupo, { headers: headers });
    }


 


}