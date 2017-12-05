import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Event from "../../../billevent/Event";
import {ActivatedRoute, RouterLinkActive} from "@angular/router";
import {BilleventApiService} from "../../billevent-api.service";
import {ShopManagerService} from "../shop-manager.service";

//
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationComponent implements OnInit {

    state = "loading";

    event: Event;
    ticket: string;

    constructor(private route: ActivatedRoute,
                private shopManager: ShopManagerService,
                private billeventApi:BilleventApiService) {
    }


    ngOnInit() {
        this.loadEvent();
    }

    loadEvent() {
        const id: number = +this.route.snapshot.paramMap.get('id');
        const order: number = +this.route.snapshot.paramMap.get('order');
        this.billeventApi.getEvent(id).subscribe(
            (e) => {
                this.event = e;
                this.shopManager.getFinalOrder(order).subscribe(
                    (s) => {
                        this.state = s.status;
                        this.ticket = s.url;
                    },
                    (error) => {
                        this.state = "failed"
                    }
                );
            },
            (error) => {
                this.state = "failed"
            }
        );
    }

}
