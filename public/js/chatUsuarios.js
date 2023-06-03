// Importar Socket.io desde el servidor
console.log("desde el chat");

// Crear una conexión con Socket.io
// @ts-ignore
const socket = io.connect('http://localhost:8080');

// Escuchar el evento 'mensaje' del servidor
socket.on('mensaje', function (data) {
  // Añadir el mensaje al div de mensajes
  let p = document.createElement('p');
  p.textContent = data.texto;
  // @ts-ignore
  document.getElementById('mensajes').appendChild(p);
});


// Escuchar el evento 'submit' del formulario de nombre
// @ts-ignore
document.getElementById('form-nombre').addEventListener('submit', function (e) {
  e.preventDefault();
  // @ts-ignore
  const nombre = document.getElementById('nombre').value;
  console.log(nombre);
  // Enviar el nombre al servidor mediante el evento 'nombre'
  socket.emit('nombre', {
    nombre: nombre
  });
});


// Escuchar el evento 'submit' del formulario de mensaje
// @ts-ignore
document.getElementById('form-mensaje').addEventListener('submit', function (e) {
  e.preventDefault();
  // @ts-ignore
  const texto = document.getElementById('texto').value;
  console.log(texto);
  // Enviar el texto al servidor mediante el evento 'mensaje'
  socket.emit('mensaje', {
    texto: texto
  });
  // @ts-ignore
  document.getElementById('texto').value =""
});



const boton_logoutChat = document.getElementById('btn_logout')
if (boton_logoutChat) {
  boton_logoutChat.addEventListener('click', async (e) => {
      e.preventDefault()
      // @ts-ignore
      const nombre = document.getElementById('nombre').value;
      socket.on ('disconnect', function () {
        // Aquí emites el evento DelPlayer al servidor con el nombre del usuario
        socket.emit ('usuarioDeslogeado', nombre);
      });

      const { status } = await fetch('/api/usuariosLogin', {
        method: 'DELETE'
      })
  
      if (status === 200) {
        window.location.href = 'http://localhost:8080/api/sessions/login'
      } else {
        console.log('[logout] estado inesperado: ' + status)
      }
  
    })
  }