import bcrypt from 'bcrypt'

// const alfabeto = [
//     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//     'i', 'j', 'k', 'l', 'm', 'o', 'n', 'p',
//     'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
//     'y', 'z', ' ', '"', '{', '}', ',', ':',
//     '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
//     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//     'i', 'j', 'k', 'l', 'm', 'o', 'n', 'p',
//     'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
//     'y', 'z', ' ', '"', '{', '}', ',', ':',
//     '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
// ]

// const corrimiento = 10

// function cifrarLetra(letra, corrimiento) {
//     const index = alfabeto.findIndex(l => l === letra)
//     const nuevoIndice = index + corrimiento
//     return alfabeto[nuevoIndice]
// }

// // reversible!
// export function cifrarFrase(frase) {
//     return frase.split('').map(letra => cifrarLetra(letra, corrimiento)).join('')
// }

// export function descifrarFrase(frase) {
//     return frase.split('').map(letra => cifrarLetra(letra, -corrimiento)).join('')
// }



//Estas 2 funciones las agrega la libreria bcrypt, son para hashear (codificar) datos
// irreversible!
export function hashear(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}//esta funcion me devuelve hasheado lo que quiero encriptar, por medio de la generacion de un salt aleatorio


//comparacion de variables con bcrypt. siempre primero el dato que voy a encriptar  , y luego el encriptado. devuelve un booleano (t or f)
export function validarQueSeanIguales(recibida, almacenada) {
    // return hashear(recibida) !== almacenada
    return bcrypt.compareSync(recibida, almacenada)
}