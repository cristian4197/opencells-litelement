import { css } from 'lit';

export const styles = css`
  /* Para texto en inputs y botones */
  input, button, label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400; /* Regular */
    color: #333;
  }

  /* Estilos globales para eliminar los estilos por defecto de los inputs */
  input {
    all: unset; /* Resetea todos los estilos */
    box-sizing: border-box; /* Asegura que el tamaño del input no cambie con los bordes o el padding */
    width: 100%; /* O lo que necesites */
    padding: 8px 12px; /* Establece un padding básico */
    font-size: 16px; /* Establece un tamaño de fuente */
    border: 1px solid #ccc; /* Añades un borde básico */
    border-radius: 4px; /* Bordes redondeados */
  }

  input:focus {
    border-color: #007BFF; /* Azul */
    outline: none;
  }
 

  .form-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-login__container-user {
    width: 300px;
    margin-bottom: 16px;
  }

  .form-login__container-password {
    width: 300px;
    margin-bottom: 16px;
  }

  .form-login__container-btn-login {
    display: grid;
    place-content: center;
  }

  .form-login__btn-login {
    background-color: #007bff;
    color: #fff;
    box-sizing: border-box;
    width: 300px;
    height: 48px;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 12px;
  }

  .form-login__btn-login:hover {
    background-color: #0056b3;
    cursor: pointer;
  }

  .form-login__error {
    color: red;
    font-size: 16px;
  }
`;
