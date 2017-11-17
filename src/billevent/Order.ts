import Client from './Client';
import Billet from './Billet';
import Event from './Event';
import Product from "./Product";
import Category from "./Category";

/**
 * Gestionaire d'une commande
 */
export default class Order {

    id: number = -1;
    client: Client | null;
    billets: Billet[] = [];
    event: Event;

    productsCount: Map<number, number> = new Map();
    categories: Set<Category>;

    constructor() {
    }

    static load(event) {
    }

    toJson() {
        return {
            id: this.id,
            billets: this.billets
        };
    }

    /**
     * Assign that Order to an event.
     * @param {Event} event The event to assign
     */
    setEvent(event: Event) {
        if (this.id !== -1) {
            throw new Error("This order is already saved!");
        }
        this.event = event;
    }

    getPriceTTC() {
        if(this.categories) {
            let total = 0.0;
            this.categories.forEach((cat) => {
                cat.products.forEach((product) => {
                    total += this.productsCount[product.id] * product.price_ttc;
                })
            });
            return total;
        } else {
            return 0;
        }
    }

    getPriceHT() {
        if(this.categories) {
            let total = 0.0;
            this.categories.forEach((cat) => {
                cat.products.forEach((product) => {
                    total += this.productsCount[product.id] * product.price_ht;
                })
            });
            return total;
        } else {
            return 0;
        }
    }
}
