//imports de passport
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'

//import bcrypt
import { hashear, validarQueSeanIguales } from '../utils/criptografia.js'

//Daos
import { usuarioModel } from '../../public/dao/models/schemaUsuarios.js'
import {User} from '../entidades/User.js'

//CFG
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'

//SERVICIOS
import { usuariosService } from '../servicios/usuariosService.js'


// @ts-ignore
passport.use('local', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
        let buscado
        try {
            buscado = await usuarioModel.findOne({ email: req.body.email }).lean()
            buscado = await usuariosService.buscarUsuarioPorEmail(req.body.email)
            
        } catch (error) {
            return done(new Error('error de autenticacion'))
        }
    
        // @ts-ignore
        if (!validarQueSeanIguales(req.body.password, buscado['password'])) {
            return done(null, false, { message: 'Contraseña incorrecta' })
        }
    
        // @ts-ignore
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            rol: req.body.rol,
            cart: req.body.cart
        })
    
        // @ts-ignore
        done(null, buscado)
        } catch (error) {
            new Error('error de autenticacion')
        }
    })
  );


  // @ts-ignore
  passport.use('github', new GithubStrategy({
    clientID: githubClienteId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl,
    scope: ['user:email']

}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile['_json'].login);
        const email = profile.emails[0].value
        console.log(email);

        const usuarioBuscado = await usuariosService.buscarUsuarioPorEmail(email)
        console.log("USUARIO BUSCADO POR SERVICIO", usuarioBuscado);
        
        if (usuarioBuscado) {
            console.log("USUARIO ENCONTRADO");
            done(null, usuarioBuscado);
        } else {
            let user = new User({
                first_name: profile['_json'].login || "Pendiente nombre",
                last_name: profile['_json'].html_url || "Pendiente apellido",
                email: email,
                password: hashear(profile['_json'].login),
                age: 2,
                rol: "User",
                cart: "Pendiente"
            });

            
            await usuariosService.registrar(user);
            console.log("USUARIO CREADO CON EXITO", user);
            done(null, user);
        }
    } catch (error) {
        console.error('error de logeo', error);
        done(error);
    }
}));

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
export const autenticacionUserPass = passport.authenticate('local', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const antenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })




