import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Category from '../../../../billevent/Category';
import {BilleventApiService} from "../../../billevent-api.service";
import Order from "../../../../billevent/Order";
import Product from "../../../../billevent/Product";

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

    constructor(private api: BilleventApiService) {
    }

    ngOnInit() {
        this.api.getCategories(this.order.event.id).subscribe(
            (categories) => {
                this.categories = new Set(categories);
                this.order.categories = this.categories;
                this.categories.forEach((cat) => {
                    cat.products.forEach((product) => {
                        this.order.productsCount[product.id] = 0;
                    })
                });
                console.log(this.categories);
            },
            (err) => {
                console.error(err);
            }
        );
    }

    checkAmount(product) {

    }

    updateCount(product: Product, $event: Event) {
        const count = parseInt((<HTMLSelectElement>$event.target).value);
        console.log("Update " + product.id + "-" + product.name + " to " + count);
        let countBefore = this.order.productsCount[product.id];
        this.order.productsCount[product.id] = count;
        this.order.updateBillet().then(()=>{}, (error) => {
            this.order.productsCount[product.id] = countBefore;
            (<HTMLSelectElement>$event.target).value = countBefore.toString();
            alert(error.message);
        })
    }

    getTotalPrice() {
        return this.order.getPriceTTC();
    }

}
