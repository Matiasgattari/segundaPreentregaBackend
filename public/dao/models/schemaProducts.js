import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export const schemaProducts = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    category: { type: String, required: true , index: true },
    status: { type: String, required: true },
    // id: { required: true, unique:true,type: Schema.Types.ObjectId}
}, { versionKey: false })

schemaProducts.plugin(mongoosePaginate)
export const productsDB = mongoose.model('products', schemaProducts)


// await productsDB.deleteMany()


// const productManager = new ProductManager('../../productos.txt');
// const poductosLeidos = await productManager.getProducts()
// console.log(poductosLeidos);


// await productsDB.insertMany(poductosLeidos)

// await productsDB.create({ // insertOne en version mongoose
//         title: "tv1",
//         description: "descripcion prod 3",
//         price: 3500,
//         thumbnail: "url imagen",
//         stock: 45,
//         code: "televisor",
//         category: "hogar",
//         status: true,
//         id: "1"
// })
// await productsDB.create({ // insertOne en version mongoose
//         title: "tv2",
//         description: "descripcion prod 3",
//         price: 3500,
//         thumbnail: "url imagen",
//         stock: 45,
//         code: "televisor",
//         category: "hogar",
//         status: true,
//         id: "2"
// })
// await productsDB.create({ // insertOne en version mongoose
//         title: "tv4",
//         description: "descripcion prod 3",
//         price: 3500,
//         thumbnail: "url imagen",
//         stock: 45,
//         code: "televisor",
//         category: "hogar",
//         status: true,
//         id: "3"
// })


// const productosBase = await productsDB.find()

// console.log(productosBase);

