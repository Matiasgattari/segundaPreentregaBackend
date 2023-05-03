import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { productsRouter } from './routes/productsRouter.js';
import { cartsRouter } from './routes/cartsRouter.js';
import { PORT } from './config/config.sv.js';
import { ProductManager } from '../public/dao/ProductManager.js';
import util from 'node:util'
import { sessionsRouter } from './routes/sessionsRouter.js';
import { cartManager } from './routes/cartsRouter.js';
import { productsDB } from '../public/dao/models/schemaProducts.js';

//inicializando mongoose en el sv
import {inicioMongoose} from './database/mongoose.js'

import { postAUsuarios, postAUsuariosLogin } from './controllers/api/usuarios.controller.js';
// import { postUsuarios } from './controllers/api/usuarios.controller.js';

// import { autenticacion } from './middlewares/autenticacion.js';
// import { profileView } from './controllers/web/perfil.controller.js';
// import { registroView } from './controllers/web/registro.controller.js';

import session from './middlewares/session.js';
import { manejadorDeErrores } from './middlewares/manejoDeErroresRest.js';
import passport from 'passport';


const productManager = new ProductManager('./productos.txt')


const app = express()

app.engine('handlebars', engine())
app.set('views', './views') //ruta donde estaran las vistas del handlebars
app.set('view engine', 'handlebars') // que el motor por defecto para manejar las viastas sea handlebars

app.use(express.static('./public')) //permite el uso de los archivos dentro de la carpeta public
app.use(express.static('./static')) //permite el uso de los archivos dentro de la carpeta static


app.use(express.json()) //para poder recibir archivos json desde express


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

app.use(session)

const httpServer = app.listen(PORT)
console.log(`Servidor escuchando en puerto ${PORT}`);
// lo mismo que me devuelve el http.createServer() !!

export const io = new SocketIOServer(httpServer)


app.get('/', async (req, res) => {
   res.json({"message":"bienvenido al servidor"})
})




//PARTE PROBLEMA: al presionar el boton de "cargar" o eliminar, esta misma orden se envia en loop haciendo crashear la pagina (se cargan entre 1-11 veces el mismo producto con distinto id). Al eliminar entiendo pasa algo similar pero como elimina 1 solo producto x id no crashea.
app.get('/realtimeproducts', async (req, res, next) => {

    const listado1 = await productManager.getProducts()




    //probando recibir producto nuevo para agregar por socket.io
    io.on('connection', async clientSocket => {

    clientSocket.on('nuevoProducto',async function agregarProd (productoAgregar)  {
     await productManager.addProduct(productoAgregar.title,productoAgregar.description,productoAgregar.price,productoAgregar.thumbnail,productoAgregar.stock,productoAgregar.code,productoAgregar.category)

    })
    
    clientSocket.emit('actualizarProductos', listado1)
    // io.sockets.emit('actualizarProductos', listado1) 

    clientSocket.on('eliminarProducto',  productoEliminar => {
        productManager.deleteProduct(productoEliminar)
    })

    })



    const listado = [];
    listado1.forEach(element => {listado.push(JSON.stringify(element))});

res.render('realTimeProducts.handlebars', {
        titulo: 'Products',
        encabezado: 'Lista de productos en base de datos',
        listado,
        hayListado: listado.length > 0
   })
})










app.get('/home', async (req, res, next) => {
  
    const listado1 = await productManager.getProducts()
    

    const producto = [];
    listado1.forEach(element => {producto.push(JSON.stringify(element))
        
    });
    
        res.render('home.handlebars', {
            titulo: 'Products',
            encabezado: 'Lista de productos en base de datos',
            producto,
            hayProductos: producto.length > 0
        })
})

app.get('/chat', async (req,res,next) => {
  
res.render('chat.handlebars', {
    titulo: 'Products',
    encabezado: 'Lista de productos en base de datos'
})
})




//controlador post "api/usuarios" a la cual hice el fetch en register.js

app.post('/api/usuarios',postAUsuarios)
// app.post('/api/usuarios',passport.authenticate('register', { failWithError: true }) ,postAUsuarios)

//controlador post para login 

app.post('/api/usuariosLogin',postAUsuariosLogin)

//controlador delete para login
app.delete('/api/usuariosLogin', async function deleteSesiones(req, res, next) {
    req.session.destroy(err => {
      res.sendStatus(200)
    })
  })




// app.get('/api/products/productSelected/:pid', async (req, res) => {
   

    
    
//     const pid = req.params.pid
//     //probando recibir producto nuevo para agregar por socket.io
//     io.on('connection', async clientSocket => {


//             clientSocket.on('agregarProducto', async valorInputAgregarCarrito => {
//                 await cartManager.agregarProductoAlCarrito(valorInputAgregarCarrito,pid)
//             })


//     })
//     const productoFiltrado = await productsDB.find({_id:pid}).lean()

//     res.render('productSelect.handlebars', {
//             pid:JSON.stringify(pid),
           
//             producto:util.inspect(productoFiltrado, false, 10)
           
//         })
       
        
//         })

app.use(manejadorDeErrores)