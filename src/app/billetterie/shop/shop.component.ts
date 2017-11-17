import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../billevent/Order";
import Event from "../../../billevent/Event";

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


    constructor() {
        this.step = 0;
    }

    ngOnInit() {
        if(!this.order) {
            this.order = new Order();
            this.order.setEvent(this.event);
        }
    }

}
