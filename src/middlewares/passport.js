//imports de libreria passport
import passport from 'passport'
import { Strategy } from 'passport-local'

//import bcrypt
import { hashear, validarQueSeanIguales } from '../utils/criptografia.js'

//Daos
import { userManager } from '../routes/sessionsRouter.js'
import { usuarioModel } from '../../public/dao/models/schemaUsuarios.js'
import {User} from '../entidades/User.js'
// import { ErrorDeAutenticacion } from '../entidades/errors/ErrorDeAutenticacion.js'


//con passport.use le paso la estrategia de REGISTRO , pidiendole que envie la peticion como primer parametro (passReqToCallback:true)
// passport.use('register', new Strategy({ usernameField: 'email',passReqToCallback: true  },async (req,email, password, done) => {
   
//     const usuarioEncontrado =await usuarioModel.findOne({ email: email }).lean()
    
//     try {
//         if(usuarioEncontrado!==null) {
//             return done(null, false, { message: 'Error de credenciales' });
//         }
//         //extraigo datos personales del body y creo nuevo usuario
//         const {first_name,last_name,email,password,age,rol} = req.body
//         const user = new User({first_name:first_name,last_name:last_name,email:email,password:hashear(password),age:age,rol:rol})

//         const usuarioCreado=  userManager.createUser(user)
                
//         done(null, user)

//     } catch (error) {
//         done(error)
//     }
// }))


passport.use('register', new Strategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    
    //   const usuarioEncontrado = await usuarioModel.findOne({ email: email }).lean();
  try {
    
        // if(usuarioEncontrado !== null) {
        //   return done(null, false, { message: 'El email ya está en uso' });
        // }
    
        // const { first_name, last_name, email, password, age, rol } = req.body;
        const user = new User({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashear(req.body.password), age: req.body.age, rol: req.body.rol });
    
        await userManager.createUser(user)
        done(null,user)
  } catch (error) {
    
  }
   
  }));






//busco un usuario, llamo al done con ese usuario y queda logeado, aunque esta no es la mejor forma de hacerlo
passport.use('login', new Strategy({
    //puedo poner "con que nombre" voy a encontrar los campoos username y password, ya que si los nobmres no son los correctos no va a funcionar
    usernameField: 'email',
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



// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas. ESTO es necesario para el funcionamiento de passport, le dice que hacer con las sesiones y como manejar los usuarios. 
passport.serializeUser((user, next) => { next(null, user) }) // "cuando termina la interaccion con el controller, llama al next con ese usuario sin hacerle nada como estaba guardado en la sesion"
passport.deserializeUser((user, next) => { next(null, user) })// "que va a guardar cuando me llegue la sesion con la cookie"

//exporto el middleware que va a usar passport para que todo este mecanismo funcione
export const passportInitialize = passport.initialize() //middleware de passport propiamente dicho
export const passportSession = passport.session() //middleware a travez del que passport inicializa la sesion
//estos 2 exports son los que cargo con el app.use(passportInitialize, passportSession) del lado del servidor.js