import Client from './Client';
import Billet from './Billet';
import Event from './Event';

/**
 * Gestionaire d'une commande
 */
export default class Order {

  id: number = null;
  client: Client | null;
  billets: Billet[] = [];
  event: Event;

    constructor(response) {
        this.id = response.id;
        this.client = response.client ? new Client(response.client) : null;
        this.event = new Event(response.event);
        this.billets = response.billets ?
            response.billets.map((billet) => new Billet(billet)) : [];
    }

    static load(event) {}

    toJson() {
        return {
            id: this.id,
            billets: this.billets
        };
    }

}
