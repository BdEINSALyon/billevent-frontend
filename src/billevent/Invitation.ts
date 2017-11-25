

import Client from "./Client";
import Event from "./Event";

export class Invitation{
    id: number;
    event: Event;
    client: Client;
    token: String;

    constructor(invitation){
        this.id = invitation.id;
        this.event = new Event(invitation.event);
        this.client = invitation.client;
        this.token = invitation.token;
    }

}