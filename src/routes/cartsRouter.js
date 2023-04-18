import express, {
    json,
    Router
} from 'express';
import { ProductManager } from '../../public/dao/ProductManager.js';
import { Product } from '../../public/dao/ProductManager.js';
import { CartManager } from '../../public/dao/CartManager.js';
import {
    randomUUID
} from 'crypto'
import util from 'node:util'

import { engine } from 'express-handlebars'
// const app = express()

// app.engine('handlebars', engine())
// app.set('views', './views')
// app.set('view engine', 'handlebars')


export const cartsRouter = Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({
    extended: true
}))


const productManager = new ProductManager('./productos.txt');
const cartManager = new CartManager('./carrito.txt')

cartsRouter.get('/:cid', async (req, res) => {
       try {
        const IDCarrito = req.params.cid
        const carritosLeidos = await cartManager.getCarts()
        
        if (IDCarrito)  {
            const carritoFiltradoID= await cartManager.getCartById(IDCarrito)
            res.send(carritoFiltradoID)
            } else {
                throw new Error("no existe el id")
            }
        }
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }


})


cartsRouter.get('/', async (req, res) => {
const carritos = await cartManager.getCarts();
const arrayCarritos = []
const carritoForeach = carritos.forEach((carrito)=> arrayCarritos.push(JSON.stringify(carrito)))



const hayCarritos = (arrayCarritos!=null)

    res.render('carts.handlebars', {
        encabezado: 'Lista de carritos creados',
        hayCarritos,
        carritos,
        arrayCarritos
   })

})



cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        // const productos = await productManager.getProducts()
        // const carritos = await cartManager.getCarts()
// const producto = await productManager.getProductById(pid)
        // const actualizado = await cartManager.agregarProductoAlCarrito(cid,pid)
        // const carritoActualizado = await cartManager.getCartById(cid)
        // const prodAct = await cartManager.getCartById(cid)
    // res.json({"message": "producto cargado correctamente"})
const bla = await cartManager.agregarProductoAlCarrito(cid,pid)


    res.json(bla)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})