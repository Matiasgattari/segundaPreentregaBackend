console.log("hola desde el carrito");

const botonComprar = document.getElementById("botonComprarCarrito")
botonComprar?.addEventListener("click", ()=>{
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value
    window.location.href = `http://localhost:8080/api/carts/${valorInputCarritoID}/purchase/`
})

const botonEliminarProducto = document.getElementById("botonEliminarProducto")
botonEliminarProducto?.addEventListener("click", ()=>{
    
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value

    
    // @ts-ignore
    const valorInputProductoID = document.getElementById("inputProductoEliminar")?.value
    // console.log(valorInput);

    window.location.href = `http://localhost:8080/api/carts/${valorInputCarritoID}/productoEliminar/${valorInputProductoID}/`


})

const botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
botonVaciarCarrito?.addEventListener("click", ()=>{
    console.log("soy un boton de vaciar carrito");
    // @ts-ignore
    const valorInputCarritoID = document.getElementById("inputCarritoID")?.value
    window.location.href = `http://localhost:8080/api/carts/${valorInputCarritoID}/vaciarCarrito/`
    
})