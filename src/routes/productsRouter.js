import express, {Router} from 'express';
import { Product, productManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
// export const productManager = new ProductManager('./productos.txt');
import { Server as SocketIOServer } from 'socket.io'
import { io } from '../servidor.js';
import { cartManager } from '../../public/dao/CartManager.js';
import { log } from 'console';
import { productosService } from '../servicios/productosService.js';
import { carritosService } from '../servicios/carritosService.js';

export const productsRouter = Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({extended:true}))


productsRouter.get('/', async (req,res)=>{
try {
    const criterioDeBusqueda = { }

    const opcionesDePaginacion = {
        limit: req.query.limit || 10, // tamaño de pagina
        page: req.query.page || 1, // pagina inicial
        lean: true, // para que devuelva objetos literales, no de mongoose
        sort :  {price : req.query.sort || -1},
        pagination: true,
        options: {category:req.query.query}
    }


    // @ts-ignore
    let result = await productsDB.paginate(criterioDeBusqueda, opcionesDePaginacion)

    const arrayProductos = []
    result.docs.forEach((res)=>{arrayProductos.push(util.inspect(res, false, 10))})
    // console.log(result)
   

    //filtrado por titulo
    const productosFiltradosXTitulo = []
    const filtrandoXTitulo =  result.docs.forEach((res)=>{if(res.title==req.query.query)
        productosFiltradosXTitulo.push(util.inspect(res, false, 10))})
    const filtroTitle = req.query.query

    //filtrado por disponibilidad
    const productosFiltradosXDisp = []
    const filtrandoXDisp =  result.docs.forEach((res)=>{if(res.status==true)
        productosFiltradosXDisp.push(util.inspect(res, false, 10))})
    const filtroTDisp = req.query.status

    const filtro = filtroTitle || filtroTDisp

    const context = {
        pageTitle: 'Products',
        hayDocs: result.docs.length > 0,
        docs: result.docs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        nextPage: result.nextPage,
        hasPrevPage: result.hasPrevPage,
        prevPage: result.prevPage,
        pagingCounter: result.pagingCounter,
        sort:req.query.sort || -1,
        arrayProductos,
        filtroXTitulo: filtroTitle,
        // noHayFiltro:true,
        arrayFiltradoXTitulo: productosFiltradosXTitulo || arrayProductos,
        disponibilidad: filtroTDisp,
        arrayFiltradoXDisp: productosFiltradosXDisp,
        filtro:filtro
        }

    res.render('products.handlebars', context)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

} )

productsRouter.get('/json/productsJSON', async (req, res) => {
    const productos = await productosService.buscarProductos()
    res.send(productos)
    
    })
    

productsRouter.get('/:pid', async (req,res)=>{

    try {
        const idProducto = req.params.pid
        
        const poductosLeidos = await productosService.buscarProductos()
        
        if (idProducto)  {
            const prodFiltradoID= await productosService.buscarProductoPorId(idProducto)

            // res.send(prodFiltradoID)
            res.render('productSelect', {
                encabezado: "Producto",
                producto:prodFiltradoID
            })} else {
                throw new Error("no existe el id")
            }


          
        }
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }


} )



productsRouter.post('/', async (req, res) => {
    try {
        await productosService.buscarProductos()

        const producto1 = new Product({
            ...req.body,
            id: randomUUID()
        })
      
        const addProducto = await productosService.crear(producto1.dto().title, producto1.dto().description,producto1.dto().price, producto1.dto().thumbnail, producto1.dto().stock, producto1.dto().code,producto1.dto().category)

        res.json(addProducto)
    } catch (error) {
        throw new Error('aiuda')
    }
})


productsRouter.put('/:pid',async( req,res)=>{
try {

    const getProds = await productosService.buscarProductos()
    const id= req.params.pid
    const prodActualizado = req.body

    await productosService.modificarProducto(id,prodActualizado)
    // res.send('Producto actualizado correctamente')
    res.send(prodActualizado)
   
} catch (error) {
    throw new Error ('Error: no se encontro el producto filtrado. ')
}
} )

productsRouter.delete('/:pid',async( req,res)=>{
    try {
    
        const getProds = await productosService.buscarProductos()
        const id= req.params.pid
        await productosService.eliminarProducto(id)
      
        res.send('Producto eliminado correctamente')
       
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )


    productsRouter.put('/productSelected/:pid', async (req, res) => {
        const pid = req.params.pid
        //probando recibir producto nuevo para agregar por socket.io
        io.on('connection', async clientSocket => {
    
    
                clientSocket.on('agregarProducto',  valorInputAgregarCarrito => {
                    carritosService.agregarProductoAlCarrito(valorInputAgregarCarrito,pid)
                    console.log(valorInputAgregarCarrito)
                        console.log(pid)
                })
    
    
        })

        const productoFiltrado = await productosService.buscarProductoPorId(pid)
    
        res.render('productSelect.handlebars', {
                pid:JSON.stringify(pid),
               
                producto:util.inspect(productoFiltrado, false, 10)
               
            })
           
        
        })
        