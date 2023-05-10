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

import session from './middlewares/session.js';

import { manejadorDeErrores } from './middlewares/manejoDeErroresRest.js';

//imports passport
import passport from 'passport';
import { antenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass, passportInitialize } from './middlewares/passport.js';
import { passportSession } from './middlewares/passport.js';

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

app.use(passportInitialize, passportSession) // acá cargo passport en el servidor express como middleware

const httpServer = app.listen(PORT)
console.log(`Servidor escuchando en puerto ${PORT}`);
// lo mismo que me devuelve el http.createServer() !!

export const io = new SocketIOServer(httpServer)


app.get('/', async (req, res) => {
   res.json({"message":"bienvenido al servidor"})
})



//REGISTRO controlador POST a /API/USUARIOS a la cual hice el fetch en register.js
//sin passport 
app.post('/api/usuarios',postAUsuarios)

//LOGIN controlador POST a /API/USUARIOSLOGIN a la cual hice el fetch en login.js

//local
app.post('/api/usuariosLogin', autenticacionUserPass, postAUsuariosLogin);

// login con github. esto es lo nuevo que se agrega
sessionsRouter.get('/github', autenticacionPorGithub)
//esta es la ruta a la que devuelve la info github luego de autenticar. este al terminar la autenticacion redirige a inicio
sessionsRouter.get('/githubcallback', antenticacionPorGithub_CB, (req, res, next) => { res.redirect('/api/sessions/current') })

//LOGOUT
app.delete('/api/usuariosLogin', async function deleteSesiones(req, res, next) {
    req.session.destroy(err => {
      res.sendStatus(200)
    })
  })


app.get('/realtimeproducts', async (req, res, next) => {

    const listado1 = await productManager.getProducts()

    // recibir producto nuevo para agregar por socket.io
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