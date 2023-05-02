import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/auth.config.js'
import { validarQueSeanIguales } from '../utils/criptografia.js'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config/auth.config.js'
import { userManager } from '../../public/dao/UserManager.js'
import { usuarioModel } from '../../public/dao/models/schemaUsuarios.js'
import { User } from '../../public/dao/UserManager.js'

export function autenticacion(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/api/sessions/register')
  //   res.redirect('/login')
  }
}


passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
      let token = null
      if (req && req.signedCookies) {
          token = req.signedCookies['jwt_authorization']
      }
      return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY,
}, async (jwt_payload, done) => {
  try {
      done(null, jwt_payload) // payload es el contenido del token, ya descifrado
  } catch (error) {
      done(error)
  }
}))

export function autenticacionJwtApi(req, res, next) {
  passport.authenticate('jwt', (error, jwt_payload, info) => {
      if (error || !jwt_payload) return next(new Error('ERROR_DE_AUTENTICACION'))
      req.user = jwt_payload
      next()
  })(req, res, next)
}

export function autenticacionJwtView(req, res, next) {
  passport.authenticate('jwt', (error, jwt_payload) => {
    //el manejo de error es un REDIRECT porque es un controller web
      if (error || !jwt_payload) return res.redirect('/login')
      req.user = jwt_payload
      next()
  })(req, res, next)
}


//--------------ESTRATEGIAS DE LOGEO --------------
// *****LOCAL******
passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField:'password' }, async (username, password, done) => {
  const buscado = await userManager.getUserByUserName(username)
  
  if (!buscado)
      return done(new Error('ERROR_DE_AUTENTICACION'))
  if (!validarQueSeanIguales(password, buscado['password']))
      return done(new Error('ERROR_DE_AUTENTICACION'))
  delete buscado['password']
  done(null, buscado)
}))



// *****GITHUB******
passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  let user
  try {
      user = await userManager.getUserByUserName(profile.username)
  } catch (error) {
    
    
    // @ts-ignore
    user = new User({
      email: profile.username,
    })

    await userManager.createUser(user)

  }
  done(null, user)
}))





// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()

// estos son para cargar como middlewares antes de los controladores correspondientes. como saque todo lo relacionado con sesiones, al exportar estos middlewares, tengo que colocarles la configuracion {session:false} en la exportacion
export const autenticacionLocal = passport.authenticate('local', { session: false, failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { session: false, scope: ['user:email'] }) //recibe la peticino del cliente y reenvia a github
export const antenticacionPorGithub_CB = passport.authenticate('github', { session: false, failWithError: true }) //recibe la peticion de github y lo reenvia a mi controller
