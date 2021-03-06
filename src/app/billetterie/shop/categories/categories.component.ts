import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Category from '../../../../billevent/Category';
import {BilleventApiService} from "../../../billevent-api.service";
import Order, {Code} from "../../../../billevent/Order";
import Product from "../../../../billevent/Product";
import {ShopManagerService} from "../../shop-manager.service";

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
    displayInfo = {};
    code: Code;
    applyingCode = false;
    newCode:string = "";

    constructor(private api: BilleventApiService, private shopManager: ShopManagerService) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.api.getCategories(this.order.event.id).subscribe(
            (categories) => {
                this.categories = new Set(categories);
                this.order.categories = this.categories;
                this.categories.forEach((cat) => {
                    cat.products.forEach((product) => {
                        this.order.productsCount[product.id] = this.order.countProducts(product);
                        this.displayInfo[product.id] = false;
                    })
                });
            },
            (err) => {
                console.error(err);
            }
        );
    }

    updateCount(product: Product, $event: Event) {
        const count = parseInt((<HTMLSelectElement>$event.target).value);
        let countBefore = this.order.productsCount[product.id];
        this.order.productsCount[product.id] = count;
        this.order.updateBillet(this.shopManager).then(()=>{}, (error) => {
            this.order.productsCount[product.id] = countBefore;
            (<HTMLSelectElement>$event.target).value = countBefore.toString();
            alert(error);
        })
    }

    getTotalPrice() {
        return this.order.getPriceWithCoupon();
    }

    validateOrder(){

        this.order.updateBillet(this.shopManager).then(
            () => {
                if(this.order.billets.length <= 0) return;
                this.shopManager.register(this.order).subscribe(
                    (order) => {
                        this.order = order;
                        window.scrollTo(0, 0)
                    },
                    (err) => {
                        console.error(err);
                        alert('Une erreur s\'est produite, la commande ne peut pas être enregistrée.');
                    }
                )
            }, (error) => {
                console.error(error);
                if(typeof error === 'string')
                    alert(error);
                else
                    alert('Une erreur s\'est produite, la commande ne peut pas être enregistrée.');

            }
        );
    }

    applyCoupon() {
        if(!this.applyingCode) {
            this.applyingCode = true;
            this.shopManager.applyCoupon(this.order, this.newCode).subscribe(
                (order) => {
                    this.code = order.coupon;
                    this.applyingCode = false;
                }, () => {
                    this.applyingCode = false;
                    alert('Le code demandé n\'existe pas ou n\'est pas valable');
                }
            );
        }
    }

    removeCoupon() {
        if(!this.applyingCode) {
            this.applyingCode = true;
            this.shopManager.applyCoupon(this.order, '').subscribe(
                (order) => {
                    this.code = order.coupon;
                    this.applyingCode = false;
                }, () => {
                    this.applyingCode = false;
                }
            );
        }

    }
}
