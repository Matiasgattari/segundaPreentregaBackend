import mongoose, { Schema } from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2'
// import util from 'node:util'
// import { ProductManager } from '../../public/productManager.js';

// import { MONGODB_PATH } from './src/config/config.mongo';
// import { CartManager } from '../../public/CartManager.js';

await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
console.log(`conectado a base de datos en ${'mongodb://127.0.0.1:27017/ecommerce'}`);


//-------------------------------------------CARRITOS-------------------------------------------

// const vis = [
//     {
//       "id": "642f2faab4be60728cdd1ae3",
//       "quantity": 43,
//       "products": [
//         {
//           "productID": "643ee24355da2d5dba436ce1",
//           "quantity": 3
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce3",
//           "quantity": 18
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce4",
//           "quantity": 2
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce5",
//           "quantity": 2
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce6",
//           "quantity": 7
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce7",
//           "quantity": 3
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce8",
//           "quantity": 5
//         },
//         {
//           "productID": "643ee24355da2d5dba436ce9",
//           "quantity": 3
//         }
//       ]
//     }
//   ]

  
//   const schemaCarts = new mongoose.Schema({
//     id: { type: String, required: true, unique:true },
//     quantity: { type: Number },
//     products: {
//         type: [
//             {
//                 productID: {
//                         type: Schema.Types.ObjectId, // este Schema estaba en minusculas en la diapo, ojo, va en mayúsculas!
//                         ref: 'products'
//                     },
//                 quantity:{ type: Number }
//             }
//         ],
//         default: [], // este default faltaba en la diapositiva, ojo!
//     }
// }, { versionKey: false })


// // schemaCarts.pre(/^find/, function (next) {
// //     this.populate('products.productID')
// //     next()
// // })



// export const cartsDB = mongoose.model('carts', schemaCarts)




// await cartsDB.deleteMany({})
// await cartsDB.insertMany(vis)
// const carritos = await cartsDB.find()

// console.log(util.inspect(carritos, false, 10));
// await mongoose.connection.close()




//-------------------------------------------PRODUCTOS-------------------------------------------


 
//   const prod =   {
//     title: 'bulbasaur',
//     description: 'descripcion prod 3',
//     price: 3500,
//     thumbnail: 'url imagen',
//     stock: 45,
//     code: 'televisor',
//     category: 'hogar',
//     status: true
//     }
//   const prod1 =   {
//     title: 'bulbasaur2',
//     description: 'descripcion prod 3',
//     price: 3500,
//     thumbnail: 'url imagen',
//     stock: 45,
//     code: 'televisor',
//     category: 'hogar',
//     status: true
//     }
  


// const vis2 = [
//     {
//             title: 'bulbasaur',
//             description: 'descripcion prod 3',
//             price: 3500,
//             thumbnail: 'url imagen',
//             stock: 45,
//             code: 'bulvo',
//             category: 'planta',
//             status: true
//             },
//     {
      
//       title: 'ivysaur',
//       description: 'descripcion prod 2',
//       price: 2500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'venasaur',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'charmander',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'charmileon',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'charizard',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'squirtle',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'warturtle',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'blastoise',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'caterpie',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'metapod',
//       description: 'descripcion prod 3',
//       price: 4000,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'buterfree',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'cocina',
//       category: 'hogar',
//       status: true
//     },
//     {
      
//       title: 'weedle',
//       description: 'descripcion prod 3',
//       price: 4000,
//       thumbnail: 'url imagen',
//       stock: 45,
//       category: 'hogar',
//       code: 'cocina',      
//       status: true
//     }
//   ]

const vis3 = [{
    title: 'bulbasaur',
    description: 'descripcion prod 3',
    price: 3500,
    thumbnail: 'url imagen',
    stock: 45,
    code: 'bulvo',
    category: 'planta',
    status: true
    },
    {
        title: 'bulbasaur1',
        description: 'descripcion prod 3',
        price: 3500,
        thumbnail: 'url imagen',
        stock: 45,
        code: 'bulvo',
        category: 'planta',
        status: true
        },
    {
         title: 'bulbasaur2',
            description: 'descripcion prod 3',
            price: 3500,
            thumbnail: 'url imagen',
            stock: 45,
            code: 'bulvo',
            category: 'planta',
            status: true
            }]


  export const schemaProducts = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true, min: 1 },
    code: { type: String, required: true },
    category: { type: String, required: true , index: true },
    status: { type: Boolean, required: true },
    id:{type: Schema.Types.ObjectId}
}, { versionKey: false })

// schemaProducts.plugin(mongoosePaginate)
export const productsDB = mongoose.model('products', schemaProducts)



await productsDB.deleteMany({})
// await productsDB.create(prod)
// await productsDB.create(prod1)
// await productsDB.create(prod2)
// await productsDB.create(prod3)
// await productsDB.create(prod4)
// await productsDB.create(prod5)
// await productsDB.create(prod6)
// await productsDB.create(prod7)
// await productsDB.create(prod8)
// await productsDB.create(prod9)
// await productsDB.create(prod10)
// await productsDB.create(prod11)
// await productsDB.create(prod12)
// await productsDB.create(prod13)
// await productsDB.create(prod14)



await productsDB.insertMany(vis3)
// await productsDB.insertMany(prod1)
console.log(await productsDB.find());
// console.log(vis2);
await mongoose.connection.close()
