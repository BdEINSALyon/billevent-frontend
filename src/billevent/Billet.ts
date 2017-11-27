import Product from "./Product";
import Option from "./Option";
import Order from "./Order";
import PricingRule from "./PricingRule";

export default class Billet {
  id: number;
  product: Product;
  options: Option[];
  order: Order;

  constructor(billet) {
    this.id = billet.id;
    this.product = new Product(billet.product);
    if(billet.options)
    this.options = billet.options.map((option) => new Option(option));
    else
      this.options = [];
  }

    hasRule(rule: PricingRule) {
        for(let i=0; i<this.product.rules.length; i++){
          if(this.product.rules[rule.id] === rule.id){
            return true;
          }
        }
        return false;
    }
}
