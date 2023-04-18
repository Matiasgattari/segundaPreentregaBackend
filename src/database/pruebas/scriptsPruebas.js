import mongoose, { Schema } from 'mongoose';
import util from 'node:util'
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




// const vis2 = [
//     {
      
//       "title": "bulbasaur",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "ivysaur",
//       "description": "descripcion prod 2",
//       "price": 2500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "venasaur",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "charmander",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "charmileon",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "charizard",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "squirtle",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "warturtle",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
      
//       "title": "blastoise",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
     
//       "title": "caterpie",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
     
//       "title": "metapod",
//       "description": "descripcion prod 3",
//       "price": 4000,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
      
//     },
//     {
     
//       "title": "buterfree",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "cocina",
//       "category": "hogar",
//       "status": true,
     
//     },
//     {
     
//       "title": "weedle",
//       "description": "descripcion prod 3",
//       "price": 4000,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
//     },
//     {
      
//       "title": "kakuna",
//       "description": "descripcion prod 3",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
//     },
//     {
      
//       "title": "beedrill",
//       "description": "descripcion prod 6",
//       "price": 3500,
//       "thumbnail": "url imagen",
//       "stock": 45,
//       "code": "televisor",
//       "category": "hogar",
//       "status": true,
//     }
//   ]



//   export const schemaProducts = new Schema({
//     title: { type: String, required: true, index: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true, min: 0 },
//     thumbnail: { type: String, required: true },
//     stock: { type: Number, required: true, min: 1 },
//     code: { type: String, required: true },
//     category: { type: String, required: true , index: true },
//     status: { type: Boolean, required: true },
//     id: { required: true, unique:true,type: String}
// }, { versionKey: false })


// export const productsDB = mongoose.model('products', schemaProducts)

// await productsDB.deleteMany({})
// await productsDB.insertMany(vis2)
// console.log(await productsDB.find());
// await mongoose.connection.close()
