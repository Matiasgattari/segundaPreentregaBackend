import { usuarioModel } from "../../../public/dao/models/schemaUsuarios.js"
import { userManager } from "../../routes/sessionsRouter.js"
import { hashear, validarQueSeanIguales } from "../../utils/criptografia.js"
import {User} from '../../entidades/User.js'


export async function postAUsuarios(req,res,next){
    //con passport
    res.status(201).json(req.user)


    //sin passport
//    try {
//         console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
        
//         const usuarioCreado = await userManager.createUser(req.body)
//         req.session.user = {
//             name: req.body.first_name + ' ' + req.body.last_name,
//             email: req.body.email,
//             age: req.body.age,
//             rol: req.body.rol,
//         }
        
//         res.status(201).json({mensaje:'usuario creado exitosamente', usuario: usuarioCreado})

//    } catch (error) {
//         next(new Error('Error-De-Autanticacion'))
//    }


   /* NO LOGRO QUE FUNCIONE DE ESTA MANERA. ERROR DE PASSPORT? */
    // try {
    //     const { email, password, first_name, last_name, age,rol } = req.body

    //     const user = {first_name,last_name,email,age,rol}

    //     // const usuarioCreado = await userManager.createUser(req.body)

    //     // funcion de passport para que el registro ya me deje logueado tambien!
    //     req.login(user, error => {
    //         if (error) {
    //             next(new Error('falló el login!'))
    //         } else {
    //             res.status(201).json({mensaje:'usuario creado exitosamente'})
    //         }
    //     })
    // } catch (error) {
    //     next(new Error('Error-De-Autanticacion'))
    // }

}


export async function postAUsuariosLogin(req,res,next){
 try {
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
      
    const usuarioFiltrado = await usuarioModel.find({email:req.body.email}).lean()
   
    const validacion = validarQueSeanIguales(req.body.password,usuarioFiltrado[0].password)

    if(usuarioFiltrado && validacion ) {
        req.session.user = {
            name: usuarioFiltrado[0].first_name + ' ' + usuarioFiltrado[0].last_name,
            email: usuarioFiltrado[0].email,
            age: usuarioFiltrado[0].age,
            rol: usuarioFiltrado[0].rol,
        }
       
        res.status(201).json({mensaje:'sesion iniciada correctamente', usuario: usuarioFiltrado[0]['first_name']})
    }else {
          throw new Error('Error-De-Autanticacion')
        }
    } catch (error) {
    next(new Error('Error-De-Autanticacion'))
 }
}
