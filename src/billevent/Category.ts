import Product from "./Product";

export default class Category {
    name: string;
    desc: string;
    products: Set<Product> = new Set();

    constructor(category) {
        this.name = category.name;
        this.desc = category.desc;
        if(category.products) {
            for(let i=0; i<category.products.length; i++) {
                const product = new Product(category.products[i]);
                if(product) {
                    this.registerProduct(product);
                }
            }
        }
    }

    registerProduct(p: Product) {
        this.products.add(p);
    }

    removeProduct(p: Product){
        this.products.delete(p);
    }
}