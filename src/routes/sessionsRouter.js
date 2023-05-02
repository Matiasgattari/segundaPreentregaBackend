import express, {Router} from 'express';
import { Product, ProductManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
import { antenticacionPorGithub_CB, autenticacion, autenticacionJwtApi, autenticacionJwtView, autenticacionLocal, autenticacionPorGithub, passportInitialize } from '../middlewares/autenticacion.js';
import { profileView } from '../controllers/web/perfil.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';
import session from '../middlewares/session.js';
import { userManager } from '../../public/dao/UserManager.js';
import { getCurrentSessionController, logoutSessionsController, postSessionsController } from '../controllers/api/sessions.controller.js';
import { encriptarJWT } from '../utils/criptografia.js';

// import { UserManager } from '../../public/dao/UserManager.js';
// export const userManager = new UserManager('./usuarios.txt')

export const productManager = new ProductManager('./productos.txt');


export const sessionsRouter = Router()
sessionsRouter.use(session)
sessionsRouter.use(passportInitialize)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({extended:true}))
// sessionsRouter.use(autenticacionJwtApi)
// sessionsRouter.use(autenticacionJwtView)


sessionsRouter.get('/', async (req, res) => {
    res.render('sessions.handlebars', {})
    
})



sessionsRouter.get('/register',registroView)

sessionsRouter.get('/profile',autenticacion,profileView)

// datos de sesion, para testear!
// sessionsRouter.get('/current',autenticacion, (req,res)=>{
//     res.json(req.session['user'])
   
// })
sessionsRouter.get('/current',
    autenticacionJwtApi, //TODO
    // soloLogueadosApi, //TODO
    getCurrentSessionController
)




  
sessionsRouter.get('/login',async (req,res)=>{


const listaUsuarios = await userManager.getUsers()

// const usuarioFiltrado = await userManager.getUserById(id)


// res.status(201).json({mensaje:'usuario ubicado exitosamente', usuario: listaUsuarios})
const conUtil=util.inspect(listaUsuarios, false, 10)
const listaUsuariosArray = []
listaUsuarios.forEach(element => listaUsuariosArray.push(util.inspect(element, false, 10)))



const variablesLogin ={
    pageTitle:'lista de usuarios',
    mensaje:'usuario ubicado exitosamente',
    usuario: listaUsuariosArray}
    

res.render('login',variablesLogin)
})



// login local
sessionsRouter.post('/', autenticacionLocal, postSessionsController)

// login con github

function afterLoginViewController(req, res, next) {
    res.cookie('jwt_authorization', encriptarJWT(req.user), { signed: true, httpOnly: true })
    res.redirect('/')
}

sessionsRouter.get('/github', autenticacionPorGithub)
sessionsRouter.get('/githubcallback',
    antenticacionPorGithub_CB,
    // @ts-ignore
    afterLoginViewController //TODO
)

// logout
sessionsRouter.post('/logout', logoutSessionsController)


    
