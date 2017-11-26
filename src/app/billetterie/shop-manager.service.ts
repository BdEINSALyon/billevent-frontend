import {Injectable} from '@angular/core';
import Order from "../../billevent/Order";
import {HttpClient} from "@angular/common/http";
import {BilleventApiService} from "../billevent-api.service";
import Billet from "../../billevent/Billet";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class ShopManagerService {

    constructor(private http: HttpClient,
                private api: BilleventApiService,
                private router: Router) {
    }

    register(order: Order) : Observable<Order> {
        console.log(order)
        return this.http.post(BilleventApiService.server + '/api/events/' + order.event.id + '/order/', {
            billets: order.billets.map((billet) => {
                return {product: billet.product.id}
            })
        }).map((o) => {
            order.id = o['id'];
            order.billets = <Billet[]>o['billets'].map((billet) => new Billet(billet));
            return order;
        })
    }

    pay(order: Order) {
        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/pay/', {
            callback: this.callbackFor(order)
        })

    }

    private callbackFor(order: Order) {
        const protocol=window.location.protocol, host=window.location.host;
        return `${protocol}//${host}/billetterie/${order.event.id}/payment/${order.id}`;
    }
}
