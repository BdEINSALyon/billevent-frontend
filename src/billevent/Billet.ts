import Product from "./Product";
import Option from "./Option";
import Order from "./Order";
import PricingRule from "./PricingRule";

export class Participant {
    id: number = -1;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    billet: Billet;

    constructor(billet, participant?) {
        this.billet = billet;
        if (participant) {
            this.id = participant['id'];
            this.first_name = participant['first_name'];
            this.last_name = participant['last_name'];
            this.email = participant['email'];
            this.phone = participant['phone'];
        }
    }

    toJSON() {
        let json = {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email || '',
            phone: this.phone || '',
            billet: this.billet.id
        };
        if (this.id > 0) {
            json['id'] = this.id;
        }
        return json;
    }
}

export class BilletOption {

    id: number = -1;
    participant: Participant;
    billet: Billet;
    option: Option;
    amount: number = 1;

    constructor(billet?: Billet, option?: any) {
        this.billet = billet;
        if (option) {
            this.id = option['id'];
            this.amount = option['amount'];
            this.option = new Option(option.option);
            this.participant = this.billet.participants ? (this.billet.participants.find((p) => p.id == option.participant || (option.participant && option.participant.id))) : null;
        }
    }

    toJSON() {
        let json = {
            billet: this.billet ? this.billet.id : null,
            option: this.option.id,
            amount: this.amount,
            participant: this.participant ? this.participant.id : null
        };
        if (this.id > 0) {
            json['id'] = this.id;
        }
        return json;
    }
}

export default class Billet {
    id: number;
    product: Product;
    billet_options: Option[];
    order: Order;
    participants: Participant[];

    constructor(billet) {
        this.id = billet.id;
        this.product = billet.product ? new Product(billet.product) : null;
        if (billet.billet_options)
            this.billet_options = billet.billet_options.map((option) => new BilletOption(this, option));
        else
            this.billet_options = [];

        if (billet.participants)
            this.participants = billet.participants.map((p) => new Participant(this, p));
        else
            this.participants = [];
    }

    hasRule(rule: PricingRule) {
        for (let i = 0; i < this.product.rules.length; i++) {
            if (this.product.rules[i].id === rule.id) {
                return true;
            }
        }
        return false;
    }
}
