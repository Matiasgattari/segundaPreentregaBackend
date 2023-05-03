import { usuarioModel } from "../../../public/dao/models/schemaUsuarios.js"
import { userManager } from "../../routes/sessionsRouter.js"
import { hashear, validarQueSeanIguales } from "../../utils/criptografia.js"


export async function postAUsuarios(req,res){
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    const usuarioCreado = await userManager.createUser(req.body)
    req.session.user = {
        name: req.body.first_name + ' ' + req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        rol: req.body.rol,
    }
    
    res.status(201).json({mensaje:'usuario creado exitosamente', usuario: usuarioCreado})

    }


export async function postAUsuariosLogin(req,res){
 try {
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    // const usuarioFiltrado = await usuarioModel.find({email:req.body.email,password:hashear(req.body.password)}).lean()
    const usuarioFiltrado = await usuarioModel.find({email:req.body.email}).lean()
   
const validacion = validarQueSeanIguales(req.body.password,usuarioFiltrado[0].password)
// const validacion = true
// console.log("usuario filtrado :"+req.body.password);
// console.log("usuario almacenado :"+usuarioFiltrado[0].password);
    // if(usuarioFiltrado && validarQueSeanIguales(req.body.password,usuarioFiltrado[0].password )) {
    if(usuarioFiltrado && validacion ) {
        req.session.user = {
            name: usuarioFiltrado[0].first_name + ' ' + usuarioFiltrado[0].last_name,
            email: usuarioFiltrado[0].email,
            age: usuarioFiltrado[0].age,
            rol: usuarioFiltrado[0].rol,
        }
       
        res.status(201).json({mensaje:'sesion iniciada correctamente', usuario: usuarioFiltrado[0]['first_name']})
        

    }else {
        
        throw new Error("usuario no encontrado")
    }
    
 } catch (error) {
    error.message
 }

}
