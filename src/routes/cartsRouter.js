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
import { cartsDB } from '../../public/dao/models/schemaCarts.js';
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
export const cartManager = new CartManager('./carrito.txt')


cartsRouter.get('/json/cartsJSON', async (req, res) => {
    const carritos = await cartManager.getCarts();
 
    res.send(carritos)
    
    })


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

      
const agregarCarrito = await cartManager.agregarProductoAlCarrito(cid,pid)
    res.json(agregarCarrito)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity

      const modificarQantity = await cartManager.modificarUnidadesProcducto(cid,pid,quantity)

    res.json(modificarQantity)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})



cartsRouter.delete('/:cid',async( req,res)=>{
   
    try {
        const IDCarrito = req.params.cid
        const carritosLeidos = await cartManager.getCarts()
        const carritoFiltradoID= await cartManager.getCartById(IDCarrito)
        await cartsDB.deleteOne({_id:IDCarrito})
        res.send("carrito eliminado correctamente")
            
        }
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }})
cartsRouter.delete('/:cid/products/:pid',async( req,res)=>{
     
    try {
    
       
        const productoID= req.params['pid']
        const carritoID= req.params['cid']
    
const productosFiltrados = await cartManager.eliminarProducto(carritoID,productoID)
// const getCarts = await cartsDB.find().lean()
res.send(productosFiltrados)
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )