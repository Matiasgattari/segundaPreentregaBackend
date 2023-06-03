

export function soloLogueados(req, res, next) {
    // acá uso el atajo que me provee passport para ver
    // si hay una sesion inicializada por un usuario
    if (!req.isAuthenticated()) {
        return next(new Error('Error de credenciales, debe estar registrado para ver el contenido.'));
    }
    next();
}

export function soloAdmin(req, res, next) {
if(req.user.rol==="Admin") {next ()} else {
    next(new Error("Error de credenciales. Debe haber iniciado sesion y poseer el Rol de Admin"))
}}


export function sinLoguear(req, res, next) {
    if(req.user) {next(new Error("Usted ya esta logueado. ingrese a api/sessions/current para cerrar sesion"))} else {
        next ()
    }}
    