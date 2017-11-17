export default class Category {
    name: string;
    desc: string;

    constructor(category) {
        this.name = category.name;
        this.desc = category.desc;
    }
}