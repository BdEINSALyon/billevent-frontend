import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import Event from '../billevent/Event';

@Injectable()
export class BilleventApiService {

    server: string = "http://localhost:8000";

    constructor(private http: HttpClient) {
    }

    getEvent(id: number): Observable<Event> {
        return Observable.create((obs) => {
            this.http.get((this.server + '/api/events/' + id + '/')).subscribe((result) => {
                obs.next(result);
                obs.complete();
            });
        });
    }

}
