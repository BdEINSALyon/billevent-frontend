import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../billevent/Order";
import Event from "../../../billevent/Event";
import {ShopManagerService} from "../shop-manager.service";

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {

    @Input()
    event: Event;
    order: Order;
    step: number;
    loading = true;


    constructor(
        private shopManager: ShopManagerService
    ) {
        this.step = 0;
    }

    debug(){
        let debug = `id:${this.order.id}
status:${this.order.state}`
        return debug;
    }

    ngOnInit() {
        this.loading = true;
        this.shopManager.getCurrentOrder(this.event).subscribe(
            (order) => {
                this.order = order;
                console.log(order);
                this.loading = false;
            }, (err) => {alert('Erreur'); console.error(err);}
        );
        window.scrollTo(0, 0)
    }

}
