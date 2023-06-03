import { User } from "../../entidades/User.js";
import { userManager } from "../../../public/dao/UserManager.js";
import { usuariosService } from "../../servicios/usuariosService.js";
import { hashear } from "../../utils/criptografia.js";


export async function postAUsuarios(req,res,next){
    try {
        const user = new User({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: hashear(req.body.password), age: req.body.age, rol: req.body.rol,cart: req.body.cart });
        console.log(user);
        const registrado = await usuariosService.registrar(user)
        
        // funcion de passport para que el registro ya me deje logueado tambien!. ESTE login hace lo mismo que el "done", dejandome el usuario logeado
        req.login(user, error => {
            if (error) {
                next(new Error('falló el login!'))
            } else {
                //respuesta al servidor
                res.status(201).json(req.user)
            }
        })
    
    } catch (error) {
             new Error ("Authentication error")
         }
}

export async function getUsersController(req, res, next) {
    
    const users = await usuariosService.buscarUsuarios()
    res.json(users)
}


export async function postAUsuariosLogin(req,res,next){
    //con passport
    res.status(201).json({mensaje:'sesion iniciada correctamente'})
}

