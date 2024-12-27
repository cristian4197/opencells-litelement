import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './login-form.css.js';

@customElement('login-form')
export class LoginForm extends LitElement {
   static styles = styles;

  @property({ type: String }) email = '';
  @property({ type: String }) password = '';

  // Método para manejar el envío del formulario
  handleSubmit(event: Event) {
    event.preventDefault();  // Evitar el envío tradicional

    // Emitir un evento con los datos del formulario
    const formData = { email: this.email, password: this.password };
    this.dispatchEvent(new CustomEvent('login-submit', {
      detail: formData,  // Los datos que queremos pasar
      bubbles: true,     // Para que el evento pueda burbujear hacia arriba
      composed: true     // Para permitir que atraviese el shadow DOM
    }));
  }

  render() {
    return html`
    <form @submit="${this.handleSubmit}" class="form-login">
    <div class="form-login__container-user">
      <input
        id="user-input"
        class="form-login__input"
        type="text"
        placeholder="Email"
        .value="${this.email}"
        @input="${(e: Event) => this.email = (e.target as HTMLInputElement).value}"
        required 
      />
    </div>
    <div class="form-login__container-password">
      <input
        id="password-input"
        class="form-login__input"
        type="password"
        placeholder="Contraseña"
        .value="${this.password}"
        @input="${(e: Event) => this.password = (e.target as HTMLInputElement).value}"
        required
      />
    </div>
    <div class="form-login__container-btn-login">
      <button type="submit" class="form-login__btn-login">
        Ingresar
      </button>
    </div>
    `;
  }
}
