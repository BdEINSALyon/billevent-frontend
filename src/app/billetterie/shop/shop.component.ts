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

    ngOnInit() {
        this.loading = true;
        this.shopManager.getCurrentOrder(this.event).subscribe(
            (order) => {
                this.order = order;
                this.loading = false;
            }, (err) => {alert('Erreur'); console.error(err);}
        );
    }

    private _on_error: (err) => any;

    next(){
        switch(this.step) {
            case 0:
                this.order.updateBillet(this.shopManager).then(
                    () => {
                        this._on_error = (err) => {
                            console.error(err);
                            alert('Une erreur s\'est produite, la commande ne peut pas être enregistrée.')
                        };
                        this.shopManager.register(this.order).subscribe(
                            (order) => {
                                this.order = order;
                                this.step++;
                            },
                            this._on_error
                        )
                    }, () => {
                        this.reset();
                    }
                );
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            default:
                this.reset();
        }
    }

    private reset() {
        this.ngOnInit();
    }

    back(){
        this.step--;
    }

    canNext(){
        return this.step < 1
    }

    canBack(){
        return false
    }

}
