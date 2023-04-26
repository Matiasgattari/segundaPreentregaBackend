import express, {Router} from 'express';
import { Product, ProductManager } from '../../public/dao/ProductManager.js';
import { randomUUID } from 'crypto'
import { productsDB } from '../../public/dao/models/schemaProducts.js';
import util from 'node:util'
export const productManager = new ProductManager('./productos.txt');



export const sessionsRouter = Router()
sessionsRouter.use(express.json())
sessionsRouter.use(express.urlencoded({extended:true}))



sessionsRouter.get('/', async (req, res) => {
    res.render('sessions.handlebars', {})
    
    })
    


sessionsRouter.get('/register', async (req, res) => {
 
    res.render('register.handlebars')
    
    })



    
sessionsRouter.get('/login', async (req, res) => {

    res.render('login.handlebars')
    
    })
    
sessionsRouter.get('/profile', async (req, res) => {

    res.render('profile.handlebars')
    
    })
    
