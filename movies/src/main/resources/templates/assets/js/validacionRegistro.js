// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

  // Selecciona el formulario en el DOM
  const form = document.querySelector('form');

  // Añade un evento al formulario que se dispara cuando se intenta enviar
  form.addEventListener('submit', (event) => {
      // Si la validación del formulario falla, previene el envío del formulario
      if (!validacionForm()) {
          alert("El Formulario no es válido, por favor corrige los errores");
          event.preventDefault();
      } else {
          alert("Formulario Válido, Enviando...");
      }
  });

  // Función principal de validación del formulario
  function validacionForm() {
      let esValido = true;
      // Valida cada campo individualmente y combina el resultado con el estado de validación global
      esValido = validarCampoNombre('nombre') && esValido;
      esValido = validarCampoApellido('apellido') && esValido;
      esValido = validarCampoEmail('email') && esValido;
      esValido = validarCampoPassword('password') && esValido;
      esValido = validarCampoFechaDeNac('fechaDeNac') && esValido;
      esValido = validarCampoPais('pais') && esValido;
      return esValido;
  }

  // Validación del campo de nombre
  function validarCampoNombre(id) {
      const field = document.getElementById(id);
      const nombre = field.value.trim();
      if (nombre === "") {
          setErrorFor(field, 'El nombre es obligatorio');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Validación del campo de apellido
  function validarCampoApellido(id) {
      const field = document.getElementById(id);
      const apellido = field.value.trim();
      if (apellido === "") {
          setErrorFor(field, 'El apellido es obligatorio');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Validación del campo de email
  function validarCampoEmail(id) {
      const field = document.getElementById(id);
      const email = field.value.trim();
      if (email === "") {
          setErrorFor(field, 'El correo electrónico es obligatorio');
          return false;
      } else if (!esEmail(email)) {
          setErrorFor(field, 'El correo electrónico no es válido');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Validación del campo de contraseña
  function validarCampoPassword(id) {
      const field = document.getElementById(id);
      const password = field.value.trim();
      if (password === "") {
          setErrorFor(field, 'La contraseña es obligatoria');
          return false;
      } else if (!esPassword(password)) {
          setErrorFor(field, 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Validación del campo de fecha de nacimiento
  function validarCampoFechaDeNac(id) {
      const field = document.getElementById(id);
      const fechaDeNac = field.value.trim();
      if (fechaDeNac === "") {
          setErrorFor(field, 'La fecha de nacimiento es obligatoria');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Validación del campo de país
  function validarCampoPais(id) {
      const field = document.getElementById(id);
      const pais = field.value.trim();
      if (pais === "") {
          setErrorFor(field, 'El país es obligatorio');
          return false;
      } else {
          setSuccessFor(field);
          return true;
      }
  }

  // Muestra un mensaje de error para el campo dado
  function setErrorFor(input, message) {
      const formControl = input.closest('div');
      const errorText = formControl.querySelector('.texto-error');
      formControl.classList.add('error');
      errorText.innerText = message;
      input.focus();
  }

  // Borra el mensaje de error para el campo dado
  function setSuccessFor(input) {
      const formControl = input.closest('div');
      formControl.classList.remove('error');
      const errorText = formControl.querySelector('.texto-error');
      errorText.innerText = '';
  }

  // Valida si un string tiene el formato de un email
  function esEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Valida si una contraseña cumple con los requisitos de seguridad
  function esPassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
  }
});