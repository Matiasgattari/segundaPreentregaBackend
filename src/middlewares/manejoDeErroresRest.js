
//manejador de errores API REST (el manejo de erroes en web, es con redirects)
export function manejadorDeErrores(error, req, res, next) {
    switch (error.tipo) {
        case 'ERROR_DE_AUTENTICACION':
            res.status(401)
            break
        case 'CAMPOS-INCOMPLETOS':
            res.status(401)
            break
        case 'PRODUCT-NOT-FOUND':
            res.status(401)
            break
        case 'SERVER-COMUNICATION-ERROR':
            res.status(401)
            break
        case 'ERROR_DE_PERMISOS':
            res.status(403)
            break
        case 'CREACION-DE-CARRITO-FALLIDA':
            res.status(403)
            break
        case 'CART-NOT-FOUND':
            res.status(403)
            break
        case 'CARGA-DE-PRODUCTO-FALLIDA':
            res.status(403)
            break
        case 'USER-NOT-FOUND':
            res.status(403)
            break
        default:
            res.status(500)
    }
    
    console.log("*******************************" + "Informacion de error: " + error + " ****************************************** ")
    res.json({ errorMsg: error.message })
}
