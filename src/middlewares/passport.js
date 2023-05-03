//imports de libreria passport
import passport from 'passport'
import { Strategy } from 'passport-local'

//import de libreria bcrypt
import { hashear, validarQueSeanIguales } from '../utils/criptografia.js'

//Daos
import { userManager } from '../routes/sessionsRouter.js'
import {User} from '../entidades/User.js'
// import { ErrorDeAutenticacion } from '../entidades/errors/ErrorDeAutenticacion.js'

//con passport.use le paso la estrategia de REGISTRO , pidiendole que envie la peticion como primer parametro (passReqToCallback:true)
passport.use('register', new Strategy({ passReqToCallback: true }, async (req, _u, _p, done) => {
   
    try {

        //si hago el registro dentro de una estrategia, automaticamente lo estoy dejando logeado al ser enviado por el done. 
       //extraigo datos personales del body y creo nuevo usuario
        const user = new User({ first_name:req.body.first_name,last_name:req.body.last_name, email:req.body.email, password: hashear(req.body.password),age:req.body.age,rol:req.body.rol })

        await userManager.createUser(user)
        // const userSinPass = { first_name:req.body.first_name,last_name:req.body.last_name,username:req.body.email, email:req.body.email, age:req.body.age,rol:req.body.rol }
        done(null, user)
    } catch (error) {
        done(error)
    }
}))

//busco un usuario, llamo al done con ese usuario y queda logeado, aunque esta no es la mejor forma de hacerlo
passport.use('login', new Strategy({
    //puedo poner "con que nombre" voy a encontrar los campoos username y password, ya que si los nobmres no son los correctos no va a funcionar
    // usernameField: 'usuario',
    // passwordField: 'contrasenia'
}, async (username, password, done) => {
    // esto es lo que estaba en el controller de login
    try {
        const buscado = await userManager.getUserByUserName(username)
        if (!buscado)
            return done(new Error('error de autenticacion'))
        if (!validarQueSeanIguales(password, buscado['password']))
            return done(new Error('error de autenticacion'))
        delete buscado['password']
        done(null, buscado)
    } catch (error) {
        done(error)
    }
}))

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => {
    next(null, user['username'])
})

passport.deserializeUser((username, next) => {
    const user = userManager.getUserByUserName(username)
    next(null, user)
})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()
