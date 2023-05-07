export async function postAUsuarios(req,res,next){
    //con passport
    res.status(201).json(req.user)
}


export async function postAUsuariosLogin(req,res,next){
    //con passport
    res.status(201).json({mensaje:'sesion iniciada correctamente'})
}
