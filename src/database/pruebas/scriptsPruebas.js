import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'
// import util from 'node:util'
// import { ProductManager } from '../../public/productManager.js';

// import { MONGODB_PATH } from './src/config/config.mongo';
// import { CartManager } from '../../public/CartManager.js';

await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
console.log(`conectado a base de datos en ${'mongodb://127.0.0.1:27017/ecommerce'}`);
//-------------------------------------------CARRITOS-------------------------------------------

// const vis = [
//     {
      
//       "id": '642f2faab4be60728cdd1ae3',
//       "quantity": 43,
//       "products": [
//         {
//           "productID": "643f5af63b563953e61948f1",
//           "quantity": 3
//         },
//         {
//           "productID": "643f5af63b563953e61948f2",
//           "quantity": 18
//         },
//         {
//           "productID": "643f5af63b563953e61948f3",
//           "quantity": 2
//         },
//         {
//           "productID": "643f5af63b563953e61948f4",
//           "quantity": 2
//         },
//         {
//           "productID": "643f5af63b563953e61948f5",
//           "quantity": 7
//         },
//         {
//           "productID": "643f5af63b563953e61948f8",
//           "quantity": 3
//         },
//         {
//           "productID": "643f5af63b563953e61948fd",
//           "quantity": 5
//         },
//         {
//           "productID": "643f5af63b563953e61948fe",
//           "quantity": 3
//         }
//       ]
//     }
//   ]


  
// const schemaCarts = new mongoose.Schema({
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

// schemaCarts.plugin(mongoosePaginate)

// export const cartsDB = mongoose.model('carts', schemaCarts)





// await cartsDB.deleteMany({})
// await cartsDB.insertMany(vis)
// const carritos = await cartsDB.find()

// // console.log(util.inspect(carritos, false, 10));
// await mongoose.connection.close()




//-------------------------------------------PRODUCTOS-------------------------------------------


 


// const vis3= [
//     {
      
//       title: 'bulbasaur',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '44820200-b24d-478f-8765-e69c4f8cf650'
//     },
//     {
      
//       title: 'ivysaur',
//       description: 'descripcion prod 2',
//       price: 2500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '44820200-b24d-478f-1111-e69c4f8cf650'
//     },
//     {
      
//       title: 'venasaur',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: 'dac58fd1-4123-4b06-ad4f-aade9f184b2e'
//     },
//     {
      
//       title: 'charmander',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '065592be-4846-4b2b-891e-ceddb54a01a9'
//     },
//     {
      
//       title: 'charmileon',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '065597be-4846-4b2b-891e-ceddb54a01a9'
//     },
//     {
      
//       title: 'charizard',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '065297be-4899-4b2b-891e-ceddb54a01a9'
//     },
//     {
      
//       title: 'squirtle',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '015597be-4846-4b2b-7777-ceddb54a01a9'
//     },
//     {
      
//       title: 'warturtle',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '063597be-4846-4b2b-891e-cedd124a01a9'
//     },
//     {
      
//       title: 'blastoise',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '068597be-4846-4b2b-891e-12ddb54a01a9'
//     },
//     {
      
//       title: 'caterpie',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: 'b7e04998-900a-4078-bdff-c0068dba2121'
//     },
//     {
      
//       title: 'metapod',
//       description: 'descripcion prod 3',
//       price: 4000,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: '3307ab83-226d-49e2-905a-ef118d60172a'
//     },
//     {
      
//       title: 'buterfree',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'cocina',
//       category: 'hogar',
//       status: true,
//       id: '3307ab83-226d-49e2-905a-efd18d10572a'
//     },
//     {
      
//       title: 'weedle',
//       description: 'descripcion prod 3',
//       price: 4000,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: 'eb75a066-f01e-410e-b4d0-e622893532fd'
//     },
//     {
      
//       title: 'kakuna',
//       description: 'descripcion prod 3',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: 'ade0f4d9-716b-4453-b88d-6d5df1564232'
//     },
//     {
      
//       title: 'beedrill',
//       description: 'descripcion prod 6',
//       price: 3500,
//       thumbnail: 'url imagen',
//       stock: 45,
//       code: 'televisor',
//       category: 'hogar',
//       status: true,
//       id: 'ade0f4d9-716b-4453-tryu-6d5df1564232'
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
// await productsDB.insertMany(vis3)
// console.log(await productsDB.find());
// await mongoose.connection.close()

