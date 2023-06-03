import {
    io
} from "../../servidor.js";

export function chatController(req, res) {
    // Escuchar los eventos de conexión de Socket.io
    io.on('connection', clientSocket=> {
        console.log('Un cliente se ha conectado');

        // Escuchar el evento 'nombre' del cliente
        clientSocket.on('nombre', async function (nombre) {
            console.log(`hola ${nombre.nombre}`);
            // Enviar un mensaje a todos los clientes informando del nuevo nombre
            io.emit('mensaje', {
                texto: nombre.nombre + ' se ha unido al chat'
            });
        })

        // Escuchar el evento 'mensaje' del cliente
        clientSocket.on('mensaje', async mensaje=> {
            // console.log(mensaje.texto);
            // Enviar un mensaje a todos los clientes con el nombre y el texto recibidos
            io.emit('mensaje', {
                texto: req.user.first_name + ': ' + mensaje.texto
            });
        })


        clientSocket.on('disconnect', usuarioDeslogeado => {
            console.log('Un usuario se ha desconectado');
            // console.log(usuarioDeslogeado);
            
            //sin probar
            // io.emit('mensaje',function () {
            //     texto: ' Un usuario se ha desconectado ';
            // });


        });
    });


    res.render('chat', {
        user: req.user
    });
}