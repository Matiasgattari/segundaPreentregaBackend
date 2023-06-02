export class Cart {
#id
#quantity
#products
    constructor({
        id,
        quantity,
        products = []
    }) {
        this.#id = id;
        this.#quantity = quantity;
        this.#products = products;
    }

    dto() {
        return {
          id: this.#id,
          quantity: this.#quantity,
          products:this.#products
     }
    }

}

