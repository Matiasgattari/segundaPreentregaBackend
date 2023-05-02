import { encriptarJWT } from '../../utils/criptografia.js'

export function getCurrentSessionController(req, res, next) {
    // res.json(req.session['user'] )
    res.json(req.user)
}

export async function logoutSessionsController(req, res, next) {
    res.clearCookie('jwt_authorization', {
        signed: true,
        httpOnly: true
    }) 
    res.sendStatus(200)
}

export function postSessionsController(req, res, next) {
    res.cookie('jwt_authorization', encriptarJWT(req.user), {
        signed: true,
        httpOnly: true
    }) 
    res.status(201).json(req.user)
}