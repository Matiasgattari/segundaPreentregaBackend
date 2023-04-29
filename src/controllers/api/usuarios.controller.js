import { usuarioModel } from "../../../public/dao/models/schemaUsuarios.js"



export async function postAUsuarios(req,res){
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    // const nuevoUsuario = {name:req.body.first_name, last_name:req.body.last_name,email:req.body.email,age:req.body.age,password:req.body.password}
    // req.session.user = {
    //   name: nuevoUsuario.first_name + ' ' + nuevoUsuario.last_name,
    //   email: nuevoUsuario.email,
    //   age: nuevoUsuario.age,
    // }
    // res.status(201).json({mensaje:'usuario creado exitosamente', usuario: nuevoUsuario})
    
    const usuarioCreado = await usuarioModel.create(req.body)
    req.session.user = {
        name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
        email: usuarioCreado.email,
        age: usuarioCreado.age,
    }
    
    res.status(201).json({mensaje:'usuario creado exitosamente', usuario: usuarioCreado})

    }

// export async function postAUsuarios(req, res, next) {
//     console.log(req.body)
//     const usuarioCreado = await usuarioModel.create(req.body)
  
//     req.session.user = {
//       name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
//       email: usuarioCreado.email,
//       age: usuarioCreado.age,
//     }
  
//     res.status(201).json(usuarioCreado)
// }  