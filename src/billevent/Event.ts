import Product from './Product';
import Organizer from "./Organizer";

/**
 * Store Events retrieved from Server
 * @type {Object<string, Event>}
 */
const events = {};

export default class Event {
  id: number;
  name: string;
  description: string;
  organizer: Organizer;
  products: Product[];
  logo_url: string;
  start_time: Date;
  end_time: Date;
  website: string;
  address: string;

  constructor(event) {
    if (typeof event === 'number') {
      return events[event];
    }
    if (events.hasOwnProperty(event.id.toString())) {
      // If we already has loaded the object, use the previous one
      return events[event.id];
    } else {
      this.id = event.id;
      this.name = event.name;
      this.description = event.description;
      this.organizer = event.organizer ? new Organizer(event.organizer) : null;
      this.start_time = new Date(event.start_time);
      this.end_time = new Date(event.start_time);
      this.website = event.website;
      this.address = event.address;
          this.logo_url = event.logo_url;
    }
  }



}
