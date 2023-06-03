import { userManager } from "../../public/dao/UserManager.js"


class UsuariosService {
  async registrar(user) {
    const creado = await userManager.createUser(user)
    return creado
  }
  async buscarUsuarios(){
    const usuarios = await userManager.getUsers()
    return usuarios
    
  }
  async buscarUsuarioPorId(id){
    const usuario = await userManager.getUserById(id)
    return usuario
    
  }
  async buscarUsuarioPorEmail(userName){
    const usuario = await userManager.getUserByUserName(userName) 
    return usuario
    
  }

  async eliminarUsuario(id){
    const usuario = await userManager.deleteUser(id) 
    return "usuario eliminado"
    
  }
  async modificarUsuario(id,nuevoModificado){
    const usuarioModificado = await userManager.updateUser(id,nuevoModificado)
    return usuarioModificado
        
  }
}
export const usuariosService = new UsuariosService()