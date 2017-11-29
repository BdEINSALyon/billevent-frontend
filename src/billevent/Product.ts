import Event from './Event';
import PricingRule from './PricingRule';
import Option from './Option';
import Question from './Question';

/**
 * Store Products retrieved from Server
 * @type {Object<string, Event>}
 */
const products = {};

export default class Product {

    id: number;
    name: string;
    price_ht: number;
    price_ttc: number;
    options: Option[] = [];
    rules: PricingRule[] = [];
    questions: Question[] = [];
    event: Event;
    seats: number;

    constructor(product) {
        if (products.hasOwnProperty(product.id)) {
            return products[product.id];
        } else {
            this.id = product.id;
            this.name = product.name;
            this.price_ht = parseFloat(product.price_ht);
            this.price_ttc = parseFloat(product.price_ttc);
            if (product.rules)
                this.rules = product.rules.map((rule) => new PricingRule(rule));
            else
                this.rules = [];
            if (product.questions)
                this.questions = product.questions.map((question) => new Question(question));
            if (product.options)
                this.options = product.options.map((opt) => new Option(opt));
            this.event = product.event ? new Event(product.event) : null;
            this.seats = product.seats || 1;
            products[product.id] = this;
        }
    }

}
