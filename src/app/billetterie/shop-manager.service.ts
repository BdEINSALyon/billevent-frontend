import {Injectable} from '@angular/core';
import Order from "../../billevent/Order";
import Event from "../../billevent/Event";
import {HttpClient} from "@angular/common/http";
import {BilleventApiService} from "../billevent-api.service";
import Billet, {BilletOption, Participant} from "../../billevent/Billet";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import PricingRule from "../../billevent/PricingRule";
import Answer from "../../billevent/Answer";
import {Invitation} from "../../billevent/Invitation";

@Injectable()
export class ShopManagerService {

    constructor(private http: HttpClient,
                private api: BilleventApiService,
                private router: Router) {
    }

    getInvitation(event: Event) : Observable<Invitation>{
        return this.http.get(BilleventApiService.server + '/api/events/' + event.id + '/invitation/').map(
            (invit) => new Invitation(invit)
        )
    }

    cancelOrder(order: Order){
        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/cancel/', {})
    }

    getCurrentOrder(event: Event) : Observable<Order> {
        return this.http.get(BilleventApiService.server + '/api/events/' + event.id + '/order/').map(
            (order) => new Order(order)
        )
    }

    register(order: Order) : Observable<Order> {
        return this.http.post(BilleventApiService.server + '/api/events/' + order.event.id + '/order/', {
            billets: order.billets.map((billet) => {
                return {product: billet.product.id}
            })
        }).map((o) => {
            order.update(o);
            return order;
        })
    }

    pay(order: Order) {
        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/pay/', {
            callback: this.callbackFor(order)
        })

    }

    validateRule(order: Order, rule: PricingRule) {

        let billets = order.billets.filter((billet: Billet) => billet.hasRule(rule))

        return new Promise((resolve, reject) => {
            switch(rule.type) {
                case 'MaxSeats':
                    this.http.post(BilleventApiService.server + '/api/rules', {
                        compute: "MaxSeats",
                        data: {
                            products: Array.from(new Set(billets.map((b) => b.product.id))),
                            options: []
                        }
                    }).subscribe((result) => {
                        let count = billets.reduce((value, billet) => value + billet.product.seats, 0);
                        if(result['value']+count > rule.value) {
                            reject("Jauge maximal atteinte");
                        } else {
                            resolve(true);
                        }
                    }, reject);
                    break;
                case 'MaxProductByOrder':
                    let count = billets.reduce((value, billet) => value + billet.product.seats, 0);
                    if(count > rule.value) {
                        reject("Nombre maximal de place par commande atteinte (" + rule.value + " maximum)");
                    } else {
                        resolve(true);
                    }
                    break;
                case 'CheckMaxProductForInvite':
                    this.http.post(BilleventApiService.server + '/api/rules', {
                        compute: "InvitationsUsed",
                        data: {
                            event: order.event.id
                        }
                    }).subscribe((result) => {
                        let count = billets.reduce((value, billet) => value + billet.product.seats, 0);
                        if(result['value']+count > result['limit']) {
                            reject("Nombre maximal d'invitation atteinte ("+ result['limit']+" maximum)");
                        } else {
                            resolve(true);
                        }
                    }, reject);
                    break;
                default:
                    resolve(true);
            }
        });
    }

    getFinalOrder(id): Observable<any> {
        return this.http.get(BilleventApiService.server + '/api/order/' + id + '/final/');
    }

    private callbackFor(order: Order) {
        const protocol=window.location.protocol, host=window.location.host;
        return `${protocol}//${host}/billetterie/${order.event.id}/payment/${order.id}`;
    }

    saveParticipants(order: Order): Observable<Order> {
        let billets: Map<number, Billet> = new Map();
        let participants: Set<Participant> = new Set();
        order.billets.forEach((billet) => {
            billets.set(billet.id, billet);
            billet.participants.forEach((p) => participants.add(p));
        });
        const data = Array.from(participants).map((p) => p.toJSON());

        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/participants/', data).map(
            (response: any) => {
                order.state = response.status;
                response.billets.forEach((b) => {
                    billets.get(b.id).participants.forEach((p, i) => {
                        p.id = b.participants[i].id;
                    });
                });
                console.log(billets);
                return order;
            }
        )
    }

    saveAnswers(order: Order, answers: Set<Answer>): Observable<Order> {
        const data = Array.from(answers).map((p) => p.toJSON());

        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/answers/', data).map(
            (o: any) => {
                console.log(o);
                order.state = o.status;
                return order;
            }
        )
    }

    saveOptions(order: Order, billetOption: Set<BilletOption>): Observable<Order> {
        const data = Array.from(billetOption).filter((bo) => bo.amount > 0).map((p) => p.toJSON());

        return this.http.post(BilleventApiService.server + '/api/order/' + order.id + '/billet_options/', data).map(
            (o: any) => {
                console.log(o);
                order.state = o.status;
                return order;
            }
        )
    }
}
