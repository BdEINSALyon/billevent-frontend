import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Event from '../../billevent/Event';
import Category from '../../billevent/Category';
import Product from '../../billevent/Product';
import {ActivatedRoute} from "@angular/router";
import {BilleventApiService} from "../billevent-api.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-billetterie',
    templateUrl: './billetterie.component.html',
    styleUrls: ['./billetterie.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BilletterieComponent implements OnInit {

    state = "loading";

    event: Event;
    category: Category[];
    product: Product[];

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
                Observable.forkJoin(
                    this.billeventApi.getCategories(id).subscribe((f) => this.category = f),
                    this.billeventApi.getProduct(id).subscribe((g) => this.product = g)
                );
                this.state = "success"
            },
            (error) => {
                this.state = "failed"
            }
        );
    }
}
