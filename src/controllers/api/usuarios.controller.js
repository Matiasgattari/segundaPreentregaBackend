import { User, userManager } from "../../../public/dao/UserManager.js"
import { usuarioModel } from "../../../public/dao/models/schemaUsuarios.js"
import { encriptarJWT, hashear } from "../../utils/criptografia.js"



export async function postAUsuarios(req,res){
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    const usuarioCreado = await usuarioModel.create(req.body)
    const { email, password, first_name, last_name, age, rol } = req.body

    const user = new User({
        email,
        password: hashear(password),
        nombre: first_name,
        apellido: last_name,
        edad: age,
        rol: rol,
    })
    req.session.user = {
        name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
        email: usuarioCreado.email,
        age: usuarioCreado.age,
        rol: usuarioCreado.rol,
    }
   res.cookie('jwt_authorization', encriptarJWT(user), {
        signed: true,
        httpOnly: true
    })
    res.status(201).json({mensaje:'usuario creado exitosamente', usuario: usuarioCreado})

  
}

export async function postAUsuariosLogin(req,res){
 try {
    console.log(req.body) //con este console.log me debe llegar lo que envio por fetch post en el register.js tomado del formulario
    
    
    const usuarioFiltrado = await usuarioModel.find({email:req.body.email,password:req.body.password}).lean()

    if(usuarioFiltrado) {
        // req.user = {
        //     name: usuarioFiltrado[0].first_name + ' ' + usuarioFiltrado[0].last_name,
        //     email: usuarioFiltrado[0].email,
        //     age: usuarioFiltrado[0].age,
        //     rol: usuarioFiltrado[0].rol,
        // }

        const { email, password, first_name, last_name, age, rol } = req.body

    const user = new User({
        email,
        password: hashear(password),
        nombre: first_name,
        apellido: last_name,
        edad: age,
        rol: rol,
    })
        req.session.user = {
            name: usuarioFiltrado[0].first_name + ' ' + usuarioFiltrado[0].last_name,
            email: usuarioFiltrado[0].email,
            age: usuarioFiltrado[0].age,
            rol: usuarioFiltrado[0].rol,
        }
        res.cookie('jwt_authorization', encriptarJWT(user), {
            signed: true,
            httpOnly: true
        })
        res.status(201).json({mensaje:'sesion iniciada correctamente', usuario: usuarioFiltrado[0]['first_name']})
        

    }else {
        
        throw new Error("usuario no encontrado")
    }
    
 } catch (error) {
    error.message
 }

}


export async function getUsersController(req, res, next) {
    const users = await userManager.getUsers()
    console.log(users);
    res.json(users)
}
