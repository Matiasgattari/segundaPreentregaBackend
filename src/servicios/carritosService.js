import { cartManager } from "../../public/dao/CartManager.js"

class CarritosService {
  async crearCarrito() {
    const creado = await cartManager.crearCarrito()
    return creado
  }

  async buscarCarritos(){
    const carritos = await cartManager.getCarts() 
    return carritos
  }

  async buscarCarritoPorId(id){
    const carrito = await cartManager.getCartById(id)
    return carrito
  }

  async agregarProductoAlCarrito(cid, pid){
    const carrito = await cartManager.agregarProductoAlCarrito(cid, pid)
    return carrito
    
  }

  async eliminarProducto(cid,pid) {
    const producto = await cartManager.eliminarProducto(cid,pid) 
    return producto
  }
  async eliminarCarrito(cid) {
    const carrito = await cartManager.eliminarCarrito(cid) 
    return "carrito eliminado"
  }
  
  async persistenciaFisicaCarritos(cid,pid) {
    const carritos = await cartManager.saveCart()
    return carritos
  }

  async modificarCantidadProducto(cid,pid,cantidad){
    const productoModificado = await cartManager.modificarUnidadesProcducto(cid,pid,cantidad)
    return productoModificado     
  }
  async modificarCarrito(cid,carritoNuevo){
    const productoModificado = await cartManager.modificarCarrito(cid,carritoNuevo)
    return productoModificado     
  }
}
export const carritosService = new CarritosService()