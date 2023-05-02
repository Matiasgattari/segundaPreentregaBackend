import {
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { schemaProducts } from './models/schemaProducts.js';
import { productsDB } from './models/schemaProducts.js';
import { cartsDB } from './models/schemaCarts.js';


//constructor para creacion de productos nuevos
export class Product {
    constructor({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
    }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.id = randomUUID();
    }
}



export class ProductManager {
// #productosDb
    constructor(path) {
        this.products;
        this.path = path;
        // this.#productosDb = mongoose.model('products', schemaProducts)
    }


    async readProducts() {
        const data = await fs.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
    }

    async getProducts() {
        try {
            const prodd = await productsDB.find().lean()
            this.products = prodd;
            return this.products
        } catch (error) {
            throw new Error('SERVER-COMUNICATION-ERROR')
        }
    }


    async addProduct(title, description, price, thumbnail, stock, code, category) {

        try {
            await this.getProducts()

            const productFind = this.products.find((product) => product.title === title)
            if (productFind) {
                console.log('Ya existe un producto con ese titulo');
            }

            if (title !== undefined && description !== undefined && price !== undefined && stock !== undefined && code !== undefined && category !== undefined) {
               
                const product2 = await productsDB.create({ // insertOne en version mongoose
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    stock: stock,
                    code: code,
                    category: category,
                    status: true,
                    id: randomUUID()
            })
                this.products = await this.getProducts()
                
                const jsonProducts = JSON.stringify(this.products, null, 2)
                await fs.writeFile(this.path, jsonProducts)
              

            }

        } catch (error) {
            throw new Error('CARGA-DE-PRODUCTO-FALLIDA')
        }

    }


    async getProductById(id) {
        try {
            const IDrecibido = id;
        const jsonProducts =  await this.getProducts()
        
        this.products = jsonProducts

        const productFind = this.products.find((product) => product['_id'] == IDrecibido)

        if (productFind === undefined) {
            throw new Error('PRODUCT-NOT-FOUND')
        } else {
            const productoID = await productsDB.findOne({ _id: IDrecibido }).lean()
            return productoID

        }
        } catch (error) {
            throw new Error('PRODUCT-NOT-FOUND')
        }

    }
    


    async deleteProduct(id) {
        try {

            const productos = await this.getProducts() //este paso asumo esta de mas
        this.products = productos //este paso asumo esta de mas
        
        await productsDB.deleteOne({ _id: id })

        const productos2 = await this.getProducts() //persistencia luego de hacer el getproducts con mongoose
        this.products = productos2

        const jsonProducts = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, jsonProducts)

        return console.log("producto eliminado correctamente");
        }  catch (error) {
            throw new Error('PRODUCT-NOT-FOUND')
        }
    }

   async updateProduct(id, prodModificado) {
        try {
        await productsDB.findOneAndUpdate({_id:id},prodModificado)
        const productosActualizados = await productsDB.find().lean()
        this.products = productosActualizados

            //actualizo el filesystem
        const jsonProductsModif = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, jsonProductsModif)

        console.log("El producto se actualizo con exito", prodModificado);
        } catch (error) {
                throw new Error('PRODUCT-NOT-FOUND')
        }
   }

}


//manager de productos. prueba
// const productManager = new ProductManager('../productos.txt');
// console.log('console log de get products',await productManager.getProducts());

// const productoPrueba = {
//     "_id": "644587ac744b799f44db306b",
//     "title": "beedrill",
//     "description": "descripcion prod 6",
//     "price": 3500,
//     "thumbnail": "url imagen",
//     "stock": 45,
//     "code": "televisor",
//     "category": "bicho veneno",
//     "status": true,
//     "id": "ade0f4d9-716b-4453-tryu-6d5df1564232"
//   }

// await productManager.addProduct(productoPrueba)

// console.log("producto filtrado por ID",await productManager.getProductById('644587ac744b799f44db306b'));

// await productManager.deleteProduct('644587ac744b799f44db306b')

// const prodModif = {
//     "_id": "644587ac744b799f44db306b",
//     "title": "beedrill",
//     "description": "descripcion prod 6",
//     "price": 4500,
//     "thumbnail": "url imagen",
//     "stock": 20,
//     "code": "televisor",
//     "category": "bicho veneno",
//     "status": true,
//     "id": "ade0f4d9-716b-4453-tryu-6d5df1564232"
//   }

// await productManager.updateProduct("644587ac744b799f44db306b",prodModif)


