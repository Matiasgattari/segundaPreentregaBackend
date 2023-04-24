import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const schemaCarts = new mongoose.Schema({
    id: { type: String, required: true, unique:true },
    quantity: { type: Number },
    products: {
        type: [
            {
                productID: {
                        type: Schema.Types.ObjectId, 
                        ref: 'products'
                    },
                quantity:{ type: Number }
            }
        ],
        default: [], 
    }
}, { versionKey: false })


schemaCarts.pre(/^find/, function (next) {
    this.populate('products.productID')
    next()
})

schemaCarts.plugin(mongoosePaginate)

export const cartsDB = mongoose.model('carts', schemaCarts)

// const cartManager = new CartManager('../../carrito.txt');
// const carritosLeidos = await cartManager.getCarts()
// console.log(carritosLeidos);


// await cartsDB.insertMany(carritosLeidos)



// await cartsDB.create({id: "asd", quantity: 2, products: [1,2,3]})
// await cartsDB.create({id: "asd1", quantity: 2, products: [1,2,3]})
// await cartsDB.create({id: "asd2", quantity: 2, products: [1,2,3]})
// console.log(await cartsDB.deleteMany())
// console.log(await cartsDB.find())

