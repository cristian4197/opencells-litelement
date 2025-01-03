import { PageController } from "@open-cells/page-controller";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import '../../components/login/login-form/login-form';
import { Loading, Notify } from "notiflix";
import { styles } from "./login-page.css";

@customElement('login-page')
export class LoginPage extends LitElement {
  pageController: PageController;

   static styles = styles;

  constructor() {
    super();
    this.pageController = new PageController(this);
  }

  // Método para manejar los datos del formulario
  handleLoginSubmit(event: CustomEvent) {
    const { email, password } = event.detail;  // Obtener los datos del formulario
 
    // admin@example.com / 123456
    if (email === 'admin@example.com' && password === '123456') {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", email);
      
      this.showNotificacionSuccesLogin();
      //Retrasamos la redirección para que se pueda ver el loader
      setTimeout(() => {
        this.hideNotificacionSuccesLogin();
        this.pageController.navigate('dashboard-home');
      }, 800);
      return;
    }

    Notify.failure('Email o Contraseña incorrecta', {
      timeout: 1500
    });
  }

  private showNotificacionSuccesLogin(): void {
    Loading.standard('Iniciando Sesión...', {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Mantiene el fondo oscuro
      svgColor: '#007BFF',  // Cambia el color del loader (puedes elegir cualquier color en formato HEX, RGB, etc.)
    });
  }

  private hideNotificacionSuccesLogin(): void {
    Loading.remove();
  }

  render() {
    return html`
    <div class="login">
    <div class="login-detail">
      <div class="login__title">
        <h1>Iniciar Sesión</h1>
      </div>
      <!-- Escuchar el evento del formulario -->
      <login-form @login-submit="${this.handleLoginSubmit}"></login-form> 
    </div>
  </div>
      `;
  }
}