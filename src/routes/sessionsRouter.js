import express, {Router} from 'express';
import { Product, ProductManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
import { autenticacion } from '../middlewares/autenticacion.js';
import { profileView } from '../controllers/web/perfil.controller.js';
import { registroView } from '../controllers/web/registro.controller.js';
export const productManager = new ProductManager('./productos.txt');

import session from '../middlewares/session.js';


export const sessionsRouter = Router()
sessionsRouter.use(session)
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({extended:true}))



sessionsRouter.get('/', async (req, res) => {
    res.render('sessions.handlebars', {})
    
})



sessionsRouter.get('/register',registroView)

sessionsRouter.get('/profile',autenticacion,profileView)


sessionsRouter.get('/login', (req,res)=>{
    res.render('login')
})


    
