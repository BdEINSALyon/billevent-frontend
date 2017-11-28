import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ShopManagerService} from "../../shop-manager.service";
import Order from "../../../../billevent/Order";
import Billet, {Participant} from "../../../../billevent/Billet";

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {

    @Input()
    order: Order;

    constructor(private shopManager: ShopManagerService) {
    }

    ngOnInit() {

    }

    participants(billet: Billet) {
        for(let i = billet.participants.length; i < billet.product.seats; i++) {
            billet.participants.push(new Participant());
        }
        return billet.participants;
    }
}
