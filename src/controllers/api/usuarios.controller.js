import { usuarioModel } from "../../../public/dao/models/schemaUsuarios.js"



export async function postAUsuarios(req,res){
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    const usuarioCreado = await usuarioModel.create(req.body)
    req.session.user = {
        name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
        email: usuarioCreado.email,
        age: usuarioCreado.age,
    }
    
    res.status(201).json({mensaje:'usuario creado exitosamente', usuario: usuarioCreado})

    }
export async function postAUsuariosLogin(req,res){
 try {
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    const usuarioFiltrado = await usuarioModel.find({email:req.body.email,password:req.body.password}).lean()

    if(usuarioFiltrado) {
        req.session.user = {
            name: usuarioFiltrado[0].first_name + ' ' + usuarioFiltrado[0].last_name,
            email: usuarioFiltrado[0].email,
            age: usuarioFiltrado[0].age,
        }
       
        res.status(201).json({mensaje:'sesion iniciada correctamente', usuario: usuarioFiltrado[0]['first_name']})
        

    }else {
        
        throw new Error("usuario no encontrado")
    }
    
 } catch (error) {
    error.message
 }

}
