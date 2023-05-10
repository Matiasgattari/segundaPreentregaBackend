export class User {
    constructor({ first_name, last_name, email, password, age, rol,cart }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email=email;
        this.password = password;
        this.age = age;
        this.rol = rol;
        this.cart = cart;
    }
}
