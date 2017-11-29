import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import Event from '../billevent/Event';
import Product from "../billevent/Product";
import Category from "../billevent/Category";
import {Invitation} from "../billevent/Invitation";
import {environment} from '../environments/environment';

@Injectable()
export class BilleventApiService {
    /***Le service de communication avec l'API
     *
     * @type {string}
     */

    static server: string = environment.apiServer;
    static domains: string[] = environment.jwtDomains;
    static TOKEN_STORAGE_KEY: string = 'auth_token';

    constructor(private http: HttpClient) {
    }

    loginByToken(token: string): Observable<Invitation> {
        return Observable.create((obs) => {
            this.http.post(BilleventApiService.server + "/api/authenticate/invitation", {token})
                .subscribe(
                    (data) => {
                        localStorage.setItem(BilleventApiService.TOKEN_STORAGE_KEY, data['jwt']);
                        obs.next(new Invitation(data['invitation']));
                        console.log(data);
                        obs.complete();
                    },
                    (err) => {
                        obs.error(err);
                    }
                )

        })
    }

    login(login: string, password: string): Observable<boolean> {
        return Observable.create((obs) => {
            this.http.post(BilleventApiService.server + "/api/authenticate", {username: login, password})
                .subscribe(
                    (data) => {
                        localStorage.setItem(BilleventApiService.TOKEN_STORAGE_KEY, data['token']);
                        obs.next(true);
                        obs.complete();
                    },
                    (err) => {
                        console.error(err);
                        obs.next(false);
                        obs.complete();
                    }
                )
        })
    }

    getEvent(id: number): Observable<Event> {
        return this.http.get((BilleventApiService.server + '/api/events/' + id + '/'))
            .map((result) => {
                return new Event(result);
            });
    }

    getProduct(id: number): Observable<Product[]> {
        return this.http.get((BilleventApiService.server + '/api/products/?event=' + id))
                .map((result: any[]) => {
                    return result.map((p) => new Product(p));
                });
    }

    getCategories(id: number): Observable<Category[]> {
        return this.http.get((BilleventApiService.server + '/api/events/' + id + '/categorie/'))
                .map((result: Category[]) => {
                    const category = [];
                    for (let i = 0; i < result.length; i++) {
                        category.push(new Category(result[i]));
                    }
                    return result.map((c) => new Category(c));
                });
    }


}
