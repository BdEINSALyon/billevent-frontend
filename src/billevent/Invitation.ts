

import Client from "./Client";
import Event from "./Event";

class InvitationGrant {
    amount: number;
    product_id: number;
}

export class Invitation{
    id: number;
    event: Event;
    client: Client;
    token: string;
    seats: number;
    bought_seats: number;
    grants: InvitationGrant[];

    constructor(invitation){
        this.id = invitation.id;
        this.event = new Event(invitation.event);
        this.client = invitation.client;
        this.token = invitation.token;
        this.seats = parseInt(invitation.seats);
        this.bought_seats = parseInt(invitation.bought_seats);
        this.grants = invitation.grants;
    }

}