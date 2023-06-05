import express, {
    // @ts-ignore
    json,
    Router
} from 'express';
// @ts-ignore
import { productManager } from '../../public/dao/ProductManager.js';
// @ts-ignore
import { Product } from '../../public/dao/ProductManager.js';
// @ts-ignore
import { CartManager } from '../../public/dao/CartManager.js';
// @ts-ignore
import {
    randomUUID
} from 'crypto'
// @ts-ignore
import util from 'node:util'

// @ts-ignore
import { engine } from 'express-handlebars'
// @ts-ignore
import { cartsDB } from '../../public/dao/models/schemaCarts.js';

// @ts-ignore
import { cartManager } from '../../public/dao/CartManager.js';
import { carritosService } from '../servicios/carritosService.js';
import { soloLogueados } from '../middlewares/soloLogueados.js';
import { ticketsService } from '../servicios/ticketsService.js';
import { passportInitialize, passportSession } from '../middlewares/passport.js';
// import { authRouter } from './authRouter.js';
// import { userRouter } from './userRouter.js';
import session from '../middlewares/session.js';


export const cartsRouter = Router()

cartsRouter.use(session)
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({extended:true}))


//PASSPORT
cartsRouter.use(passportInitialize, passportSession)


// @ts-ignore
cartsRouter.get('/json/cartsJSON', async (req, res) => {
    
    const carritos = await carritosService.buscarCarritos()
    res.send(carritos)
})


cartsRouter.get('/:cid', async (req, res) => {
       try {
        const IDCarrito = req.params.cid
        // @ts-ignore
        const carritosLeidos = await carritosService.buscarCarritos()
       
        if (IDCarrito)  {const carritoFiltradoID= await carritosService.buscarCarritoPorId(IDCarrito)
        const hayCarrito= carritoFiltradoID !==null
        const arrayProductos =  []
        const forEach = carritoFiltradoID?.products.forEach(e=>arrayProductos.push(`Producto:${util.inspect(e.productID, false, 10)}, Cantidad: ${e.quantity} `))
        res.render('carritoCompra.handlebars', {
            id:IDCarrito,
            encabezado: 'Carrito para comprar',
            hayCarrito,
            
            arrayProductos
       })
    }}
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }


})


// @ts-ignore
cartsRouter.get('/', async (req, res) => {
const carritos = await carritosService.buscarCarritos()
const arrayCarritos = []
// @ts-ignore
const carritoForeach = carritos.forEach((carrito)=> arrayCarritos.push(JSON.stringify(carrito)))



const hayCarritos = (arrayCarritos!=null)

    res.render('carts.handlebars', {
        encabezado: 'Lista de carritos creados',
        hayCarritos,
        carritos,
        arrayCarritos
   })

})





cartsRouter.post('/:cid/product/:pid',soloLogueados, async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const agregarCarrito = await carritosService.agregarProductoAlCarrito(cid,pid)
        res.json(agregarCarrito)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})

cartsRouter.put('/:cid/product/:pid',soloLogueados, async (req, res) => {
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


cartsRouter.get('/:cid/productoEliminar/:pid',soloLogueados,async(req,res)=>{

try {
    const pid = req.params.pid
    // console.log(pid);
    const cid = req.params.cid
    // console.log(cid);
    const carritoBuscado = await carritosService.buscarCarritoPorId(cid)
    // console.log(carritoBuscado?.products);  
   const productoEliminado = await carritosService.eliminarProducto(cid,pid)
    res.redirect(`/api/carts/${cid}`)
    // res.send(productoEliminado)
} catch (error) {
    const pid = req.params.pid
    // console.log(pid);
    const cid = req.params.cid
    // console.log(cid);
    throw new Error(`El producto  ${pid} no se pudo eliminar del carrito ${cid} `)
}
})





cartsRouter.delete('/:cid',soloLogueados,async( req,res)=>{
   
    try {
        const IDCarrito = req.params.cid
        // @ts-ignore
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
cartsRouter.delete('/:cid/products/:pid',soloLogueados,async( req,res)=>{
     
    try {
        const productoID= req.params['pid']
        const carritoID= req.params['cid']
        const productosFiltrados = await carritosService.eliminarProducto(carritoID,productoID)
        res.send(productosFiltrados)
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )

cartsRouter.get('/:cid/purchase',soloLogueados, async(req,res)=>{

    //datos Usuario
    const usuario = req.user
    // @ts-ignore
    const email = usuario['email']
    //id del carrito
    const carritoID= req.params['cid']

    //logica para calculo del monto del ticket
    const carritoFiltrado = await carritosService.buscarCarritoPorId(carritoID)
    
    const arrayPreciosProductosConStock = []
    const arrayProductosSinStock= []
    const sumaCantidadesSinStock = arrayProductosSinStock.reduce(function(acumulador, producto) { return acumulador + producto.quantity }, 0)
   
    // @ts-ignore
    const montoCarrito = carritoFiltrado['products'].forEach(function (element,indice) {
        // @ts-ignore compruebo valido stock sobre cantidad para vender
        if(element.productID['stock']>element.quantity){arrayPreciosProductosConStock.push(element.productID['price']*element.quantity);
        } else { arrayProductosSinStock.push(element) }
    });


    
    const valorInicial = 0;
    const monto = arrayPreciosProductosConStock.reduce((accumulator, currentValue) => accumulator + currentValue, valorInicial)
    await ticketsService.crearTicket({ email:email, monto:monto, cart:carritoID })

        //ESTA PARTE DE LA LOGICA NO LA PROBE, pero deberai funcionar
    //Vaciado del carrito:
    const carritoNuevo = {id:carritoID,quantity:sumaCantidadesSinStock, products:arrayProductosSinStock}
    await carritosService.modificarCarrito(carritoID,carritoNuevo)

   
    res.send("ok, desde purchase")


})