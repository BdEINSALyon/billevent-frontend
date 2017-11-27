/**
 * Store PricingRule retrieved from Server
 * @type {Object<string, PricingRule>}
 */
import Order from "./Order";

const rules = {};

class PricingRuleError{
    name: string;
    description: string;
    message: string;

    constructor(name: string, description: string, message: string) {
        this.name = name;
        this.description = description;
        this.message = message;
    }
}

const Errors = {
    BYTI: new PricingRuleError('max', 'Nombre maximum', 'Vous avez atteint le nombre maximal de billets pour votre commande')
}

export default class PricingRule {

    id: number;
    type: string;
    value: number;

    constructor(rule) {
        if (rules.hasOwnProperty(rule.id)) {
            return rules[rule.id];
        } else {
            this.id = rule.id;
            this.type = rule.type;
            this.value = rule.value;
            rules[rule.id] = this;
        }
    }

    checkTotalCount(max: number, order: Order) {
        let count = 0;
        order.billets.forEach((billet) => {
            if (billet.product.rules.filter((rule) => rule.id == this.id).length) {
                count += billet.product.seats || 1;
            }
        });
        console.log(count, max);
        return count <= max;
    }

}
