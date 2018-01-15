import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import Category from '../../../../billevent/Category';
import {BilleventApiService} from "../../../billevent-api.service";
import Order, {Code} from "../../../../billevent/Order";
import Product from "../../../../billevent/Product";
import {ShopManagerService} from "../../shop-manager.service";
import {Invitation} from "../../../../billevent/Invitation";

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
    newCode: string = "";
    private invitation: Invitation;

    constructor(private api: BilleventApiService, private shopManager: ShopManagerService) {
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.shopManager.getInvitation(this.order.event).subscribe(
            (invitation) => {
                this.invitation = invitation;
            }
        );
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
        this.order.updateBillet(this.shopManager).then(() => {
        }, (error) => {
            this.order.productsCount[product.id] = countBefore;
            (<HTMLSelectElement>$event.target).value = countBefore.toString();
            alert(error);
        })
    }

    getTotalPrice() {
        return this.order.getPriceWithCoupon();
    }

    validateOrder() {

        this.order.updateBillet(this.shopManager).then(
            () => {
                if (this.order.billets.length <= 0) return;
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
                if (typeof error === 'string')
                    alert(error);
                else
                    alert('Une erreur s\'est produite, la commande ne peut pas être enregistrée.');

            }
        );
    }

    applyCoupon() {
        if (!this.applyingCode) {
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
        if (!this.applyingCode) {
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

    isDisabled(product: Product): boolean {
        return this.max_seats(product) <= 0;
    }

    max_seats(product: Product): number {
        let grants = 0;
        let left_seats = Math.floor(product.how_many_left / product.seats);
        if (this.invitation && this.invitation.grants) {
            this.invitation.grants.forEach((grant) => {
                if (grant.product_id === product.id) grants += grant.amount;
            });
            let used_on_other_products = 0;
            this.order.billets.forEach((billet) => {
                if (billet.product.id != product.id) {
                    used_on_other_products += billet.product.seats;
                }
            });
            let invitation_seats = this.invitation.seats - this.invitation.bought_seats - used_on_other_products;
            invitation_seats /= product.seats;
            invitation_seats = Math.floor(invitation_seats);
            left_seats = Math.min(invitation_seats, left_seats);
        }
        if (product.selling_mode == 'I') {
            return Math.min(grants, left_seats);
        } else if (product.selling_mode == 'L') {
            return 0;
        } else {
            return Math.min(left_seats, 15);
        }
    }

    seatsChoices(product: Product): number[] {
        let max = Math.floor(this.max_seats(product));
        if (max <= 0) return [0];
        return Array.from(Array(max + 1).keys());
    }
}
