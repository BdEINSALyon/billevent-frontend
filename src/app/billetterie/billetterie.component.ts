import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Event from '../../billevent/Event'
import Category from '../../billevent/Category'
import {ActivatedRoute} from "@angular/router";
import {BilleventApiService} from "../billevent-api.service";

@Component({
  selector: 'app-billetterie',
  templateUrl: './billetterie.component.html',
  styleUrls: ['./billetterie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BilletterieComponent implements OnInit {

  event: Event;
  category: Category[];

  constructor(
      private route: ActivatedRoute,
      private billeventApi: BilleventApiService
  ) {
  }

  ngOnInit() {
      this.loadEvent();
      this.loadCategory();
      this.loadProduct();
  }

    loadEvent() {
        const id: number = +this.route.snapshot.paramMap.get('id');
        this.billeventApi.getEvent(id).subscribe((e) => this.event = e);
        console.log(this.event);
    }

    loadCategory() {
        this.billeventApi.getCategories(+this.route.snapshot.paramMap.get('id')).subscribe((f) => this.category = f);
        console.log(this.category);
    }

    loadProduct(){
        this.billeventApi.getCategories(+this.route.snapshot.paramMap.get('id')).subscribe((f) => this.category = f);
        console.log(this.category);
    }
}
