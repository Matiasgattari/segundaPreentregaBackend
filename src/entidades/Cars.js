export class Cart {

    constructor({
        id,
        quantity,
        products = []
    }) {
        this.id = id;
        this.quantity = quantity;
        this.products = products;
    }
}

