import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";
import {ShopManagerService} from "../../shop-manager.service";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {


    @Input()
    order: Order;

    constructor(
        private shopManager: ShopManagerService
    ) {
    }

    ngOnInit() {


    }

    pay(){
        this.shopManager.pay(this.order).subscribe(
            (link) => {
                window.location.href = link.toString()
            },
            (err) => {
                console.log(err);
                alert("Impossible d'effectuer le paiement");
            }
        )
    }

}
