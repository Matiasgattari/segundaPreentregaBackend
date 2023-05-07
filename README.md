# segundaPreentregaBackend

Curso de programacion backend
Alumno: Matías Gattari
Rubro del ecommerce: aun variando, si tiene que ser algo real posiblemente venda figuras coleccionables, si puede ser realmente ficticio voy a vender pokemons.

Actualmente esta en desarrollo, con partes funcionales y partes que estan parchadas hasta encontrar la falla.

base de datos mongo:
database: ecommerce
collections: products, carts, messages

para iniciar el repositorio utilizo:
-mongod --dbpath E:\BD-mongo
npm i (de requerir)
npm test

dependencias que uso:
"dependencies": {
    "express": "^4.18.2",
    "express-handlebars": "^7.0.2",
    "mongoose": "^7.0.3",
    "mongoose-paginate-v2": "^1.7.1",
    "nodemon": "^2.0.22",
    "socket.io": "^4.6.1"
  }

ENDPOINTS:

"/": Pagina de inicio de la api, solo muestra un mensaje para ver que funciona (json). en la ruta /src/servidor.js se encuentran tanto los datos de este endpoint, como el SOCKET.io 

"/home": muestra una lista fija de los productos cargados en la base de datos, sin modificaciones. Esta trabajado con express-handlebars, siendo su vista /views/home.handlebars. Metodo GET

"/realtimeproducts": muestra la misma lista que "/home" pero en esta misma, se pueden cargar datos para eliminar productos y agregar un nuevo producto a la base de datos, cuenta con actualizacion automatia por medio de socket.io
Actualmente presenta problemas, "cargar" el producto pedido pero entra en un loop lo cual puede o cargarlo reiteradas veces o tildar el programa.
"eliminar" elimina el producto por medio del ID pasado, tambien entra en loop, pero al eliminar 1 solo producto se aprecia que funciona bien y no se rompe. 
Esta trabajado con express-handlebars, siendo su vista /views/realTimeProducts.handlebars  y estando su JS de frontend en /public/js/indexHome.js
Su código base y endpoints se encuentran dentro de la ruta src/routes/productRouter.js

"/chat": este endpoint esa en proceso, ya que se habia creado y luego se rompio y saco. actualmente solo muestra una vista con lo estructural basico, sin funcionalidad. Esta trabajado con express-handlebars, siendo su vista /views/chat.handlebars

"/api/products": Este endpoint muestra una lista completa de todos los productos de la base de datos. Esta trabajado con express-handlebars, siendo su vista /views/products.handlebars, estando su codigo base en src/routes/productRouter.js
por medio de la renderizacion de express y el paginate, se le agregaron tanto las opciones de paginacion como de busqueda (por pagina y criterio). La busqueda por query aun no esta probada del todo, pero deberia recibir un objeto con un criterio de busqueda como los del find en mongoDB ej: {_id:asdasasdasd}. Metodo GET
Los botones para Sort ascendente y descendente se basan en el campo "precio" y esta funcional

"/api/products/pid": METODO GET. este endpoint renderiza por medios de busqueda a la base de datos, el producto especificado por su pid ("_id" autogenerado por mongo), estando su codigo base en src/routes/productRouter.js.

"/api/products/pid": METODO PUT. este endpoint actualiza por medios de busqueda a la base de datos, el producto especificado por su pid ("_id" autogenerado por mongo), y recibiendo en el body un producto de estructura:
{
  "_id": "644587ac744b799f44db306b",
  "title": "beedrill",
  "description": "descripcion prod 6",
  "price": 3500,
  "thumbnail": "url imagen",
  "stock": 45,
  "code": "televisor",
  "category": "bicho veneno",
  "status": true,
  "id": "ade0f4d9-716b-4453-tryu-6d5df1564232"
}
 estando su codigo base en src/routes/productRouter.js. Metodo GET

"/api/carts": Este endpoint muestra una lista completa de todos los carritos de la base de datos. Esta trabajado con express-handlebars, siendo su vista /views/carts.handlebars, estando su codigo base en src/routes/cartsRouter.js
por medio de la renderizacion de express y el paginate, se le agregaron las opciones de paginacion (aunque aun no se trabajo sobre las mismas). Metodo GET. esta POPULADO.
solamente falta realizar el metodo delete del carrito entero y de cada producto particular.

"/api/carts/cid": MEOTODO GET. este endpoint renderiza por medios de busqueda a la base de datos, el carrito especificado por su cid ("_id" autogenerado por mongo), estando su codigo base en src/routes/cartsRouter.js. Metodo GET

"/api/carts/cid": MEOTODO DELETE. este endpoint elimina por medios de busqueda a la base de datos, el carrito especificado por su cid ("_id" autogenerado por mongo), estando su codigo base en src/routes/cartsRouter.js. 

"/api/carts/cid/product/pid":METODO POST. Este endpoint utiliza un metodo POST para cargar en el carrito especificado ("_id" -autogenerado por mongoose- del mismo, en este caso CID) el producto que deseo ("_id" del producto), al poseer el id del producto pasado por parametro dentro, este se ajusta solamente en +1 la cantidad del mismo. si el producto no existe en el carrito (no se encontro el _id pasado), este se carga en el carrito como un objeto { productID: ObjectId(""), quantity: 1, _id:ObjectId("643ffc0aec109cce37251944")} dentro del array "products" del carrito. tanto el carrito como cada producto distinto cargado al carrito genera su propio ID por mongoose tipo ObjectID.
Su código base y endpoints se encuentran dentro de la ruta src/routes/cartsRouter.js

"api/carts/json/cartsJSON": este endpoint muestra un JSON de los carritos sin renderizar por express

"api/products/json/productsJSON": este endpoint muestra un JSON de los productos sin renderizar por express

"api/products/productSelected/:pid" Metodo PUT. esta ruta presenta un input en el cual cargo el CID (_id autogenerado por mongoose) del carrito al que quiero cargarle el prooducto al cual ingrese. al hacer click se agrega automaticamente al carrito.

"api/sessions": muestra un inicio con redireccion a registro y login

"api/sessions/register" permite el registro del usuario, completando un formulario con metodo post que hace un fetch a /api/usuarios. carga el usuario en una base de datos y crea la sesion. actualmente le saque la obligatoriedad de que sea unico el mail para poder probarla.

"api/sessions/profile"  miestra a travez de un view handlebars muestra los datos del perfil del usuario, sin la contraseña . el fetch de su logica se realiza hacia fetch('/api/usuarios'). dicha ruta esta creada en server.js

"api/sessions/login" muestra actualmente un formulario para realizar el login, con su funcionalidad finalizada para reconocer al email y contraseña del usuario para encontrarlo y logear.  El fetch de su logica se realiza hacia fetch('/api/usuariosLogin'), dicha ruta esta creada en server.js . Actualmente renderiza una lista de usuarios creados solo con la finalidad de poder seleccionar los datos de la base de datos para poder realizar las pruebas. 





Todos los productos cargados tienen un ID propio que les doy autogenerado por el randomUUII, pero para realizar las operaciones internas actualmente cambie al uso del _id (object ID que brinda mongoose)
Todos estos endpoints a grandes rasgos funcionan, salvo las cosas que marque puntualmente.

Dentro de la carpeta public/dao se encuentran tanto los managers de productos y carritos, como los schemas de mongoose (dentro de la carpeta models)
Dentro de la carpeta public/js se encuentran los archivos JS del frontend, los cuales dan funcionalidades a botones y otras cuestiones (como socket.io del cliente)
Dentro de la carpeta src/databases se encuentra el inicio de base de datos de mongoose (el cual se importa en "src/servidor.js"  para su inicio mismo), en la misma carpeta se encuentra "/pruebas/scriptsPruebas.js" en el cual tengo codigo para limpiar y reiniciar los datos de las bases de datos de productos y de carts
Dentro de la carpeta src/config hay configuraciones del servidor


DATOS A TENER EN CUENTA 
puntos faltantes a saber:
- Falta realizar el chat funcional (hay 2 handlebars que tengo como base para hacerlo "chat" y "mensajes" siendo chat la unica que esta unida a un endpoint actualmente)

-filtro de productos por categoría lo reemplace actualmente por "title" ya que no decidi bien los productos, solo difieren en titulo.
-No logro que la funcion cartManager.modificarUnidadesProcducto(cid,pid,cantidad) funcione correctamente. mas info en el cartManager lina 119 (por favor si podes revisar)
-creo vista de registro y perfil de usuario, pero aun falta realizar la vista del login con su funcionalidad (express-session)


PUNTOS NUEVOS A AGREGAR (ENTREGA DE PASSPORT)
  -Implementar el método de autenticación de GitHub a la vista de login.

