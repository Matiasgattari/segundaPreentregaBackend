import express, {Router} from 'express';
import { Product, ProductManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
export const productManager = new ProductManager('./productos.txt');



export const productsRouter = Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({extended:true}))


productsRouter.get('/', async (req,res)=>{

// const poductosLeidos = await productManager.getProducts()

//     //obtengo parametro limit de las querys
//     const limite = req.query.limit;
//     let productosXPagina;

//     //si se brinda limite corto en el limite deseado.
//     if (limite) {
//         productosXPagina = poductosLeidos.slice(0, limite)
//         res.send(productosXPagina)
//     }

//     res.json(poductosLeidos)



    const criterioDeBusqueda = { }

    const opcionesDePaginacion = {
        limit: req.query.limit || 5, // tamaño de pagina: 5 por defecto
        page: req.query.page || 1, // devuelve la primera pagina por defecto
        lean: true // para que devuelva objetos literales, no de mongoose
    }

    // @ts-ignore
    let result = await productsDB.paginate(criterioDeBusqueda, opcionesDePaginacion)
// const result2 = util.inspect(result, false, 10)

const arrayProductos = []
result.docs.forEach((res)=>{arrayProductos.push(JSON.stringify(res))})
    // console.log(result)
   
    const context = {
        pageTitle: 'paginado',
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
        arrayProductos
    }

    res.render('products.handlebars', context)










    // try {
    //     const poductosLeidos = await productManager.getProducts()

    //     //obtengo parametro limit de las querys
    //     const limite = req.query.limit;
    //     let productosXPagina;

    //     //si se brinda limite corto en el limite deseado.
    //     if (limite) {
    //         productosXPagina = poductosLeidos.slice(0, limite)
    //         res.send(productosXPagina)
    //     }

    //     res.json(poductosLeidos)
    // } catch (error) {
    //     res.status(500).json({
    //         message: error.message
    //     })
    // }

} )


productsRouter.get('/:pid', async (req,res)=>{

    try {
        const idProducto = req.params.pid
        const poductosLeidos = await productManager.getProducts()
        
        if (idProducto)  {
            const prodFiltradoID= await productManager.getProductById(idProducto)
            res.send(prodFiltradoID)
            } else {
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
        await productManager.getProducts()

        const producto1 = new Product({
            ...req.body,
            id: randomUUID()
        })
        console.log(producto1);
        
        const addProducto = await productManager.addProduct(producto1.title, producto1.description,producto1.price, producto1.thumbnail, producto1.stock, producto1.code,producto1.category)
        res.json(addProducto)
    } catch (error) {
        throw new Error('aiuda')
    }
})


productsRouter.put('/:pid',async( req,res)=>{
try {

    const getProds = await productManager.getProducts()
    const id= req.params.pid
    const prodActualizado = req.body

    await productManager.updateProduct(id,prodActualizado)

    res.send('Producto actualizado correctamente')
   
} catch (error) {
    throw new Error ('Error: no se encontro el producto filtrado. ')
}
} )

productsRouter.delete('/:pid',async( req,res)=>{
    try {
    
        const getProds = await productManager.getProducts()
        const id= req.params.pid
           
        await productManager.deleteProduct(id)
    
        res.send('Producto eliminado correctamente')
       
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )