function validarMail(str) {
    // Comprobar si el string tiene . y @ usando el método includes
    return str.includes(".") && str.includes("@");
  }
  
  function soloLetras(palabra) {
    // Crear una expresión regular que acepte solo letras de la a a la z en mayúsculas o minúsculas
    let letras = /^[a-zA-Z]+$/;
    return letras.test(palabra); //true si coincide con la exp regular
  }
  
export class User {
    constructor({ first_name, last_name, email, password, age, rol,cart }) {
      try {
      
         if (!first_name) {
             throw new Error('El nombre no puede estar vacio')
            //  console.log('El nombre no puede estar vacio')
           }
       
         if (!soloLetras(first_name)) {
             throw new Error('El nombre solo puede contener letras a-z')
           }
 
        
         if (!last_name) {
             throw new Error('El apellido no puede estar vacio')
            //  console.log('El apellido no puede estar vacio')
           }
         
       
         if (!soloLetras(last_name)) {
             throw new Error('El apellido solo puede contener letras a-z')
           }
       
     
         if (!validarMail(email)) {
             throw new Error('El email debe ser una cadena de caracteres')
           }
       
 
         this.first_name = first_name;
         this.last_name = last_name;
         this.email=email;
         this.password = password;
         this.age = age;
         this.rol = rol;
         this.cart = cart;
      } catch (error) {
        console.log(error.mensaje);
      }
  }
}
