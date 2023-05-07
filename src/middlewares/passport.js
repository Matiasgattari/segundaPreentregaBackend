//imports de libreria passport
import passport from 'passport'
import { Strategy } from 'passport-local'

//import bcrypt
import { hashear, validarQueSeanIguales } from '../utils/criptografia.js'

//Daos
import { userManager } from '../routes/sessionsRouter.js'
import { usuarioModel } from '../../public/dao/models/schemaUsuarios.js'
import {User} from '../entidades/User.js'

passport.use('register', new Strategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    
  try {
       const user = new User({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashear(req.body.password), age: req.body.age, rol: req.body.rol });
       await userManager.createUser(user)
       done(null,user)
        } catch (error) {
            new Error ("Authentication error")
        }
    })
  );


passport.use('login', new Strategy({ passReqToCallback: true,usernameField: 'email' }, async (req, _u, _p, done) => {
    try {
        
    let buscado
    try {
        buscado = await usuarioModel.findOne({ email: req.body.email }).lean()
        // console.log("buscadooooooooo", buscado);
        // if (!buscado) {
        //     return done(null, false, { message: 'El usuario no existe' })
        // }
    } catch (error) {
        return done(new Error('error de autenticacion'))
    }

    // @ts-ignore
    if (!validarQueSeanIguales(req.body.password, buscado['password'])) {
        return done(null, false, { message: 'Contraseña incorrecta' })
    }

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        rol: req.body.rol
    })

    // @ts-ignore
    done(null, buscado)
    } catch (error) {
        new Error('error de autenticacion')
    }
}))


// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas. ESTO es necesario para el funcionamiento de passport, le dice que hacer con las sesiones y como manejar los usuarios. 
passport.serializeUser((user, next) => { next(null, user) }) // "cuando termina la interaccion con el controller, llama al next con ese usuario sin hacerle nada como estaba guardado en la sesion"
passport.deserializeUser((user, next) => { next(null, user) })// "que va a guardar cuando me llegue la sesion con la cookie"

//exporto el middleware que va a usar passport para que todo este mecanismo funcione
export const passportInitialize = passport.initialize() //middleware de passport propiamente dicho
export const passportSession = passport.session() //middleware a travez del que passport inicializa la sesion
//estos 2 exports son los que cargo con el app.use(passportInitialize, passportSession) del lado del servidor.js