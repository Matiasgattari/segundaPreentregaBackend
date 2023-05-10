console.log('desde js login');

// function busquedaUsuario(usuario){
//     console.log("console log del usuario en loginjs",usuario)
//     }

const formLogin = document.querySelector('#formLogin')

if (formLogin instanceof HTMLFormElement) {
    formLogin.addEventListener('submit', async event => {
    event.preventDefault()

    const input_email_login = document.querySelector('#input_email_login')
    const input_password_login = document.querySelector('#input_password_login')
    

    if (
        input_email_login instanceof HTMLInputElement &&
    input_password_login instanceof HTMLInputElement  
      
    ){ 
        const loginUsuario = {email: input_email_login.value,password:input_password_login.value}
 
        console.log(loginUsuario);


const response = await fetch('/api/usuariosLogin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginUsuario)
  });
  
  if (!response.ok) {
    throw new Error('Ha ocurrido un error en el servidor');
  }
  
  const usuarioLogeado = await response.json();

      console.log(usuarioLogeado)
      if(response.ok) {
        window.location.href = "http://localhost:8080/api/sessions/current"
      }
    }

  })


}
