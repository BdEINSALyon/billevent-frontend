import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";
import {ShopManagerService} from "../../shop-manager.service";
import {BilletOption} from "../../../../billevent/Billet";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {


    @Input()
    order: Order;

    cgvUrl = environment.cgvUrl || "https://cgv.billetterie.bde-insa-lyon.fr";

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

    getTotalPrice(){
        let options = 0;
        let bos: BilletOption[] = [].concat.apply([], this.order.billets.map((b) => b.billet_options));
        Array.from(bos).forEach((bo) => {
            options = options + (bo.amount * bo.option.price_ttc);
        }, 0);
        let products = this.order.billets.filter((b) => b.product !== null).reduce((price, b) => price + b.product.price_ttc, 0);
        console.log(options, products);
        return products + options;
    }

}
