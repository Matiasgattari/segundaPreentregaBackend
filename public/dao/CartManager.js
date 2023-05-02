import { ProductManager } from "./ProductManager.js";
import {
    privateDecrypt,
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

import mongoose from 'mongoose';
import { cartsDB } from "./models/schemaCarts.js";
import util from 'node:util'
import { log } from "console";



export class CartManager {

    constructor(path) {
        this.carts;
        this.path = path;
        this.products = [];
    }
    async readCarts() {
       try {
         const data = await fs.readFile(this.path, "utf-8");
       } catch (error) {
        throw new Error('CART-NOT-FOUND')
       }
        
    }

    async getCarts() {
      try {
        await this.readCarts();
        const cartsbd = await cartsDB.find().lean()
        this.carts = cartsbd
        return this.carts
      } catch (error) {
        throw new Error('CART-NOT-FOUND')
      }

    }

    async crearCarrito() {

        try {
            await this.getCarts()
        const cart = {
            "id": randomUUID(),
            "quantity": 0,
            "products": []
        }
        this.carts.push(cart)

        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, jsonCarts)
        await cartsDB.create(cart)
        console.log("carrito creado correctamente");
        } catch (error) {
            throw new Error('CART-NOT-FOUND')
        }
    }
   
    async agregarProductoAlCarrito(cid, pid) {
        try {
            //instancio productManager
            const productManager = new ProductManager('./productos.txt');

            //ubico producto por pid
            const productos = await productManager.getProducts()
            const productoIndex = productos.findIndex(prod => prod['_id'] == pid)
            const productoFiltrado = productos[productoIndex]

            //ubico carrito por cid
            const carritos = await this.getCarts()
            const carritoIndex = carritos.findIndex(carrito => carrito['_id'] == cid)
            const carritoFiltrado = carritos[carritoIndex]

            //formato de producto a pushear al array de productos del carrito
            let cant = 1
            const produID = {
                "productID": `${productoFiltrado._id}`,
                "quantity": `${cant}`
            };

            //array con todos los IDs de los productos del carrito.Es un parche para dejarlo funcional. TRATAR DE ARRAGLAR CUANDO HAYA TIEMPO. 
            const productosDentroDelCarrito = [];
            const carritoProductos = carritoFiltrado['products']
            carritoProductos.forEach(element => {
                productosDentroDelCarrito.push(element.productID)
            });
       
            //utilizo array de ids para saber si incluye PID. modifico cantidades o creo nuevo objeto
            const booleano = productosDentroDelCarrito.some(element => element['_id'] == pid )
            
            if (booleano) {
         
            const ubicoProducto = carritoProductos.find(el =>el.productID["_id"] == pid)
            ubicoProducto.quantity++;
                carritoFiltrado.quantity++;
                // await this.saveCart()
                await cartsDB.findOneAndUpdate({_id:cid},carritoFiltrado)

                this.carts= await this.getCarts()
                const jsonCarts = JSON.stringify(this.carts, null, 2)
                await fs.writeFile(this.path, jsonCarts)
               
            } else {
                const push = carritoProductos.push(produID)
                carritoFiltrado.quantity++;
                this.carts[carritoIndex].products = carritoProductos
                // await this.saveCart()
                await cartsDB.findOneAndUpdate({_id:cid},carritoFiltrado)
                this.carts= await this.getCarts()
                const jsonCarts = JSON.stringify(this.carts, null, 2)
                await fs.writeFile(this.path, jsonCarts)

            }

             return { "message": "producto cargado correctamente"  }

        } catch (error) {
            throw new Error('CARGA-DE-PRODUCTO-FALLIDA')
        }
    }



    async eliminarProducto(cid,pid){

        try {
        const carritoPorId =await  this.getCartById(cid)
        const productosCarrito =  carritoPorId?.products
        
        const arrayProductos = []
        productosCarrito?.forEach(el=>arrayProductos.push(el.productID?._id.toString()))
        const indiceProductoEliminar = arrayProductos.indexOf(pid)
        
        const nuevoCarrito = carritoPorId?.products.splice(indiceProductoEliminar,1)

        //esta parte aun sin probar
        await cartsDB.findOneAndUpdate({_id:cid},nuevoCarrito)
            this.carts= await this.getCarts()
            const jsonCarts = JSON.stringify(this.carts, null, 2)
            await fs.writeFile(this.path, jsonCarts)
        return "producto eliminado correctamente"
        } catch (error) {
            throw new Error('PRODUCT-NOT-FOUND')
        }

    }


    async saveCart() {
       try {
        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, jsonCarts)
       } catch (error) {
        throw new Error('CART-NOT-FOUND')
       }
    }

    async getCartById(id) {
     try {
        const IDrecibido = id;
        const cartsProducts =  await this.getCarts()
        
        this.carts = cartsProducts

        const cartFind = this.carts.find((cart) => cart._id == IDrecibido)

        if (cartFind === undefined) {
            throw new Error("carrito no encontrado o ID invalido")
        } else {
            const cartID = await cartsDB.findOne({ _id: IDrecibido }).lean()
            return cartID

        }
        } catch (error) {
            throw new Error('CART-NOT-FOUND')
        }
    }


//----------------------------------EN PROCESO---------------------------------------
//en proceso, actualizar cantidad del producto del carrito especificado. No logro que se modifique la cantidad del producto por la cantidad que recibo de parametro. todos los valores los recibo correctamente, pero al tratar de asignarle la cantidad, crashea todo

async modificarUnidadesProcducto(cid,pid,cantidad) {
        
    try {
        const cantidadCambiada = cantidad

    const carrito =await cartsDB.findById(cid).lean()

    const carritoPorId =await  this.getCartById(cid)
    const productosCarrito =  carritoPorId?.products
   
    const arrayProductos = []
    const pushArray = productosCarrito?.forEach(element => {
        arrayProductos.push(element['productID']?._id.toString())
                           
    })

   const index = arrayProductos?.indexOf(pid)
    
    

    // carrito?.products[index].quantity =cantidad
    
    // const nuevoCarrito = carrito
    // await cartsDB.findOneAndUpdate({_id:cid},nuevoCarrito)


    // //esta parte aun sin probar
    //     this.carts= await this.getCarts()
    //     const jsonCarts = JSON.stringify(this.carts, null, 2)
    //     await fs.writeFile(this.path, jsonCarts)

   
    

    return {message: "producto actualizado correctamente"}
    
    
    } catch (error) {
        throw new Error('CARGA-DE-PRODUCTO-FALLIDA')
    }

}



}



//Manager de carritos. Prueba
// const carrito = new CartManager('../carrito.txt')

// const product = {
//     "title": "tv2",
//     "description": "descripcion prod 2",
//     "price": 2500,
//     "thumbnail": "url imagen",
//     "stock": 45,
//     "code": "televisor",
//     "category": "hogar",
//     "status": true,
//     "id": "44820200-b24d-478f-84e9-e69c4f8cf650"
//   };


// await carrito.addProduct("44820200-b24d-478f-84e9-e69c4f8cf650", product)
// await carrito.crearCarrito()
// await carrito.agregarProductoAlCarrito("f4a19e58-569e-4a48-a64b-8fa6b542c959","eb75a066-f01e-410e-b4d0-e622893532fd")
// console.log(await carrito.getCarts())
// console.log(await carrito.getCartById("a6cd0621-fe82-4374-99ea-f78f1e50c998"))


// no se donde ponerlo
// await mongoose.connection.close()