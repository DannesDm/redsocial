import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';

@Injectable()
export class PublicationService {

    public url: string;
    public identity;
    public token;
  

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
        
    }

    addPublication(token, publication): Observable<any> {
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.url + 'publication', params, { headers: headers });
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
    /*publicaciones de los que seguimos*/

    getPublications(token, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url + 'publications/' + page, { headers: headers })
    }

    deletePublication(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'publication/' + id, { headers: headers });

    }

    getPublicaciones(page = null): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
            
            


        return this._http.get(this.url + 'publications/' + page, { headers: headers });

    }

    getPublicacion(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());


        return this._http.get(this.url + 'publication/' + id, { headers: headers });

    }


}