import { productManager } from "../../public/dao/ProductManager.js"


class ProductosService {
  async crear(title, description, price, thumbnail, stock, code, category,status) {
    const creado = await productManager.addProduct(title, description, price, thumbnail, stock, code, category,status)
    return creado
  }
  async buscarProductos(){
    const productos = await productManager.getProducts() 
    return productos
    
  }
  async buscarProductoPorId(id){
    const producto = await productManager.getProductById(id)
    return producto
    
  }

  async eliminarProducto(id){
    const producto = await productManager.deleteProduct(id) 
    return "producto eliminado"
    
  }

  async modificarProducto(id,prodModificado){
    const productoModificado = await productManager.updateProduct(id, prodModificado)
    return productoModificado
        
  }
}
export const productosService = new ProductosService()