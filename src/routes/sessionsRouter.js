import express, {Router} from 'express';
import { Product, productManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
import { autenticacion } from '../middlewares/autenticacion.js';
import { profileView } from '../controllers/web/perfil.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';
import session from '../middlewares/session.js';
import { userManager } from '../../public/dao/UserManager.js';




//PASSPORT
//importo los routers que voy a utilizar (en este caso de usuarios y de autenticacion)
import { authRouter } from './authRouter.js';
import { userRouter } from './userRouter.js';
//importo las funciones que voy a utulizar con passport de la carpeta middlewares
import { passportInitialize, passportSession } from '../middlewares/passport.js';
import { postAUsuarios } from '../controllers/api/usuarios.controller.js';
import { sinLoguear, soloLogueados } from '../middlewares/soloLogueados.js';
import { usuariosService } from '../servicios/usuariosService.js';
//importo el manejo de errores
// import { manejadorDeErrores } from '../middlewares/manejoDeErroresRest.js';











export const sessionsRouter = Router()
sessionsRouter.use(session)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({extended:true}))




//PASSPORT
sessionsRouter.use(passportInitialize, passportSession)

//cargo los middlewares de las rutas /auth y /users con app.use, para poder usarlos
sessionsRouter.use('/auth', authRouter)
sessionsRouter.use('/users', userRouter)



sessionsRouter.get('/', async (req, res) => {
    res.render('sessions.handlebars', {})
    
})


sessionsRouter.get('/register',registroView)

sessionsRouter.get('/current',soloLogueados,profileView)

sessionsRouter.get('/login',sinLoguear,async (req,res)=>{



const listaUsuarios = await usuariosService.buscarUsuarios()

const conUtil=util.inspect(listaUsuarios, false, 10)
const listaUsuariosArray = []
listaUsuarios.forEach(element => listaUsuariosArray.push(util.inspect(element, false, 10)))


const variablesLogin ={
    pageTitle:'lista de usuarios',
    mensaje:'usuario ubicado exitosamente',
    usuario: listaUsuariosArray}
    

res.render('login',variablesLogin)
})


    
