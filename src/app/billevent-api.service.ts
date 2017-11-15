import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import Event from '../billevent/Event';

@Injectable()
export class BilleventApiService {

    static server: string = "http://localhost:8000";
    static DEV_LOGIN = {
        login: 'pvienne',
        password: 'vienne'
    };
    static domains: string[] = ['localhost:8000'];
    static TOKEN_STORAGE_KEY: string = 'auth_token';

    constructor(private http: HttpClient) {
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
        return Observable.create((obs) => {
            this.login(BilleventApiService.DEV_LOGIN.login, BilleventApiService.DEV_LOGIN.password).subscribe(
                (result) => {
                    if (!result) {
                        obs.error(new Error("Login has failed"))
                    } else {
                        this.http.get((BilleventApiService.server + '/api/events/' + id + '/'))
                            .subscribe((result) => {
                                obs.next(new Event(result));
                                console.log(result);
                                obs.complete();
                            });

                    }
                }
            );
        });
    }

}
