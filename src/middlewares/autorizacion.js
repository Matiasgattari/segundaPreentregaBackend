// este middleware lo que hace es comparar el rol del usuario con el rol que le doy como parametro, si el rol es el mismo retorna el next para avanzar, si no es el mismo roll retornma un next con el error de permisos.
export function soloRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next()
        return next(new Error(`solo disponible para rol '${rol}'`))
    }
}

/* La funcion de arriba hace esto
// function soloProfesores(req, res, next) {
//     if (req.user?.rol === 'Profesor') return next()
//     return next(new ErrorDePermisos(`solo disponible para rol Profesor`))
// }

// function soloEstudiantes(req, res, next) {
//     if (req.user?.rol === 'Estudiante') return next()
//     return next(new ErrorDePermisos(`solo disponible para rol Estudiante`))
// }

// function soloTutores(req, res, next) {
//     if (req.user?.rol === 'Tutor') return next()
//     return next(new ErrorDePermisos(`solo disponible para rol Tutor`))
// }

*/