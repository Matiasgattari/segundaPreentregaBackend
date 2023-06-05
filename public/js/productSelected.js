console.log("hola desde product selected");


const formularioAgregar = document.getElementById("formularioAgregadoProductoSIndividual")
formularioAgregar?.addEventListener("submit",e=>e.preventDefault())

const botonAgregarCadaProducto = document.getElementById("botonAregarCadaProducto")
botonAgregarCadaProducto?.addEventListener("click",async ()=>{
    // @ts-ignore
    const IDCarrito = document.getElementById("carritoAAgregar").value
    // @ts-ignore
    const idProducto = document.getElementById("idProductoAgregar").value
   
    
    // // construir la URL del endpoint con los parámetros
    // const url = `http://localhost:8080/carts/${IDCarrito}/product/${idProducto}`;
    
    // // hacer una petición POST usando fetch
    // fetch(url, {
    //   method: "POST",
    // })
    //   .then(response => response.json()) // convertir la respuesta a JSON
    //   .then(data => {
    //     // hacer algo con los datos recibidos
    //     console.log(data);
    //   })
    //   .catch(error => {
    //     // manejar el error
    //     console.error(error);
    //   });


    // construir la URL del endpoint con los parámetros
const url = `http://localhost:8080/api/carts/${IDCarrito}/product/${idProducto}`;

// hacer una petición POST usando fetch
try {
  const response = await fetch(url, {
    method: "POST",
  });
  const data = await response.json(); // convertir la respuesta a JSON
  // hacer algo con los datos recibidos
  console.log(data);
  // redireccionar la página después de que se complete la petición
  window.location.href = `http://localhost:8080/api/carts/${IDCarrito} `;
} catch (error) {
  // manejar el error
  console.error(error);
}

    // window.location.href = `http://localhost:8080/api/carts/${IDCarrito} `

})




const botonVolverAProductos = document.getElementById("volverAProductos")
botonVolverAProductos?.addEventListener("click",()=>{console.log("volviendo a productos");
window.location.href = `http://localhost:8080/realtimeproducts/`
})
