

import Client from "./Client";
import Event from "./Event";

export class Invitation{
    id: number;
    event: Event;
    client: Client;
    token: String;
    seats: String;
    bought_seats: String;

    constructor(invitation){
        this.id = invitation.id;
        this.event = new Event(invitation.event);
        this.client = invitation.client;
        this.token = invitation.token;
        this.seats = invitation.seats;
        this.bought_seats = invitation.bought_seats;
    }

}