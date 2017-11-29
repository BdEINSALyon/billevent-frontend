import Event from './Event';
import PricingRule from './PricingRule';
import Question from './Question';

/**
 * Store Products retrieved from Server
 * @type {Object<string, Option>}
 */
const options = {};

export default class Option {
  id: number;
  name: string;
  price_ht: number;
  price_ttc: number;
  rules: PricingRule[];
  event: Event;
  seats: number;
    target: string;
    type: string;

  constructor(option) {
    if (options.hasOwnProperty(option.id)) {
      return options[option.id];
    } else {
      this.id = option.id;
      this.name = option.name;
      this.price_ht = parseFloat(option.price_ht);
      this.price_ttc = parseFloat(option.price_ttc);
      this.rules = option.rules.map((rule) => new PricingRule(rule));
      this.event = option.event ? new Event(option.event) : null;
      this.seats = option.seats || 1;
      this.target = option.target || 'Order';
      this.type = option.type || 'single';
      options[option.id] = this;
    }
  }

}
