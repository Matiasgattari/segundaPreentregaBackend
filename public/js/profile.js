console.log('desde js profile');

const boton_logout = document.getElementById('btn_logout')
if (boton_logout) {
    boton_logout.addEventListener('click', async (e) => {
      e.preventDefault()
  
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

