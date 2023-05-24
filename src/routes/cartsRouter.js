import express, {
    json,
    Router
} from 'express';
import { productManager } from '../../public/dao/ProductManager.js';
import { Product } from '../../public/dao/ProductManager.js';
import { CartManager } from '../../public/dao/CartManager.js';
import {
    randomUUID
} from 'crypto'
import util from 'node:util'

import { engine } from 'express-handlebars'
import { cartsDB } from '../../public/dao/models/schemaCarts.js';

import { cartManager } from '../../public/dao/CartManager.js';
import { carritosService } from '../servicios/carritosService.js';
// const app = express()

// app.engine('handlebars', engine())
// app.set('views', './views')
// app.set('view engine', 'handlebars')


export const cartsRouter = Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({
    extended: true
}))


// const productManager = new ProductManager('./productos.txt');



cartsRouter.get('/json/cartsJSON', async (req, res) => {
    
    const carritos = await carritosService.buscarCarritos()
    res.send(carritos)
})


cartsRouter.get('/:cid', async (req, res) => {
       try {
        const IDCarrito = req.params.cid
        const carritosLeidos = await carritosService.buscarCarritos()
        
        if (IDCarrito)  {
            const carritoFiltradoID= await carritosService.buscarCarritoPorId(IDCarrito)
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
const carritos = await carritosService.buscarCarritos()
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
        const agregarCarrito = await carritosService.agregarProductoAlCarrito(cid,pid)
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
        const modificarQantity = await carritosService.modificarCantidadProducto(cid,pid,quantity)
        res.json(modificarQantity)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})



cartsRouter.delete('/:cid',async( req,res)=>{
   
    try {
        const IDCarrito = req.params.cid
        const carritosLeidos = await carritosService.buscarCarritos()
        const carritoFiltradoID=await carritosService.buscarCarritoPorId(IDCarrito)
        if(!carritoFiltradoID) {throw new Error("carrito no encontrado")}
        await carritosService.eliminarCarrito(IDCarrito)
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
        const productosFiltrados = await carritosService.eliminarProducto(carritoID,productoID)
        res.send(productosFiltrados)
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )