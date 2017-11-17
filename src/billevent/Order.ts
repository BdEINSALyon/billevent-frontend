import Client from './Client';
import Billet from './Billet';
import Event from './Event';
import Product from "./Product";

/**
 * Gestionaire d'une commande
 */
export default class Order {

    id: number = -1;
    client: Client | null;
    billets: Billet[] = [];
    event: Event;

    selectionsCount: Map<number, number> = new Map();

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
}
