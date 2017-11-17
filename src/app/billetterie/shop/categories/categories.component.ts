import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Category from '../../../../billevent/Category';
import {BilleventApiService} from "../../../billevent-api.service";
import Order from "../../../../billevent/Order";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  @Input()
  order: Order;

  categories: Set<Category> = new Set();
  lenght: number;

  constructor(
      private api: BilleventApiService
  ) {
  }

  ngOnInit() {
    this.api.getCategories(this.order.event.id).subscribe(
        (categories) => {
          this.categories = new Set(categories);
        },
        (err) => {
          console.error(err);
        }
    );
  }

  checkAmount(product){
    console.log("46546")
  }

}
