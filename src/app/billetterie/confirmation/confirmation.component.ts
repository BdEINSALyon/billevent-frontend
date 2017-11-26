import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Event from "../../../billevent/Event";
import {ActivatedRoute, RouterLinkActive} from "@angular/router";
import {BilleventApiService} from "../../billevent-api.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmationComponent implements OnInit {

    state = "loading";

    event: Event;

    constructor(private route: ActivatedRoute,
                private billeventApi: BilleventApiService) {
    }


    ngOnInit() {
        this.loadEvent();
    }

    loadEvent() {
        const id: number = +this.route.snapshot.paramMap.get('id');
        this.billeventApi.getEvent(id).subscribe(
            (e) => {
                this.event = e;
                this.state = "success"
            },
            (error) => {
                this.state = "failed"
            }
        );
    }

}
