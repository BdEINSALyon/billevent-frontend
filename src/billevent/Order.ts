import Client from './Client';
import Billet from './Billet';
import Event from './Event';
import Product from "./Product";
import Category from "./Category";
import PricingRule from "./PricingRule";
import {ShopManagerService} from "../app/billetterie/shop-manager.service";

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
    state: number = 0;


    constructor(order: any) {

        if(order) {
            this.update(order);
        }

    }

    update(order: any) {
        this.id = parseInt(order['id']) || -1;
        this.client = order['client'] ? new Client(order['client']) : null;
        this.event = new Event(order['event']);
        this.state = order['status'] || 0;
        this.billets = order['billets'] ? order['billets'].map((b) => new Billet(b)) : [];
    }

    /**
     * Update quantity of Billet to match to a Product amount
     * @returns {Promise<boolean>}
     */
    updateBillet(shopManager: ShopManagerService){
        return new Promise((resolve, reject) => {
            if(this.state <= 1){
                let billets = [];
                let rules: Set<PricingRule> = new Set();
                this.categories.forEach((cat) => {
                    cat.products.forEach((product) => {
                        for(let i=0; i < this.productsCount[product.id]; i++) {
                            billets.push(new Billet({product}));
                            for (let rule of product.rules) {
                                rules.add(rule);
                            }
                        }
                    })
                });
                const oldBillets = this.billets;
                this.billets = billets;
                let rulesCheckPromises = [];
                rules.forEach((rule) => {
                    rulesCheckPromises.push(shopManager.validateRule(this, rule));
                });
                Promise.all(rulesCheckPromises).then(
                    () => {
                        console.log('OK');
                        resolve();
                    },
                    (error) => {
                        this.billets = oldBillets;
                        reject(error);
                        console.log('KO');
                    }
                );
                console.log(billets)
            } else {
                reject();
            }
        });
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

    private getProduct(id){
        let p = null;
        this.categories.forEach((cat) => {
            cat.products.forEach((product) => {
                if(product.id === id){
                    p = product;
                }
            })
        });
        return p;
    }

    countProducts(product: Product) {
        return this.billets.reduce((previous, billet) => {
            if(billet.product.id === product.id)
                return previous + 1;
            else
                return previous;
        }, 0)
    }
}
