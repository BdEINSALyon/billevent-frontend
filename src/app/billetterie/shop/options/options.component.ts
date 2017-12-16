import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Order from "../../../../billevent/Order";
import {BilletOption} from "../../../../billevent/Billet";
import {ShopManagerService} from "../../shop-manager.service";

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OptionsComponent implements OnInit {

    @Input()
    order: Order;

    billet_options: Set<BilletOption> = new Set();
    globalOptions = new Set();

    constructor(
        private shopManager: ShopManagerService
    ) {
    }

    ngOnInit() {
        this.order.billets.forEach((b) => {
            b.product.options.forEach((opt) => {
                if(opt.target === 'Order') this.globalOptions.add(opt);
            })
        })
        window.moveTo(0,0);
    }

    hasOrderOptions(){
        return this.globalOptions.size > 0;
    }

    updateBilletOption(billet_option: BilletOption) {
        this.billet_options.add(billet_option);
    }

    getTotalPrice(){
        let options = 0;
        Array.from(this.billet_options).forEach((bo) => {
            options = options + (bo.amount * bo.option.price_ttc);
        }, 0);
        return this.order.getPriceWithCoupon(options);
    }

    validateOptions(){
        this.shopManager.saveOptions(this.order, this.billet_options).subscribe(
            () => {},
            (err) => {console.error(err)}
        )
    }
}
