import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";
import {ShopManagerService} from "../../shop-manager.service";
import {BilletOption} from "../../../../billevent/Billet";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

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
    alertShown=false;

    constructor(private shopManager: ShopManagerService,
                private router: Router) {
    }

    ngOnInit() {


    }

    pay() {
        this.shopManager.pay(this.order).subscribe(
            (link) => {
                if (link.toString().length > 0)
                    window.location.href = link.toString()
                else {
                    this.router.navigate(['billetterie', this.order.event.id, 'payment', this.order.id])
                }
            },
            (err) => {
                if (err.status == 201)
                    this.router.navigate(['billetterie', this.order.event.id, 'payment', this.order.id]);
                else
                    alert("Impossible d'effectuer le paiement");
            }
        )
    }

    getTotalPrice() {
        let options = 0;
        let bos: BilletOption[] = [].concat.apply([], this.order.billets.map((b) => b.billet_options));
        Array.from(bos).forEach((bo) => {
            options = options + (bo.amount * bo.option.price_ttc);
        }, 0);
        return this.order.getPriceWithCoupon(options);
    }

}
