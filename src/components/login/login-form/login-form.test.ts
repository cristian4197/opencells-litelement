import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './login-form';  // Asegúrate de que esta ruta sea correcta para importar tu componente
import { LoginForm } from './login-form'; // Importa el tipo LoginForm

describe('LoginForm Component', () => {
  let loginForm: LoginForm;

  beforeEach(async () => {
    // Arrange: Crear el fixture del componente con las propiedades necesarias
    loginForm = await fixture<LoginForm>(html`<login-form></login-form>`);
  });

  describe('Render Tests', () => {
    it('should render correctly with default properties', async () => {
      // Act: Obtener los elementos del shadow DOM
      const emailInput = loginForm.shadowRoot?.querySelector('#user-input') as HTMLInputElement;
      const passwordInput = loginForm.shadowRoot?.querySelector('#password-input') as HTMLInputElement;

      // Assert: Verificar que los elementos han sido renderizados
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();

      // Assert: Verificar que los valores por defecto son correctos
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  describe('Property Tests', () => {
    it('should reflect email and password properties in the input elements', async () => {
      // Arrange: Cambiar las propiedades email y password
      loginForm.email = 'test@example.com';
      loginForm.password = 'password123';

      // Act: Esperar a que el componente se actualice
      await loginForm.updateComplete;

      // Assert: Verificar que los valores de los inputs son correctos
      const emailInput = loginForm.shadowRoot?.querySelector('#user-input') as HTMLInputElement;
      const passwordInput = loginForm.shadowRoot?.querySelector('#password-input') as HTMLInputElement;
      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');
    });
  });

  describe('Event Tests', () => {
    it('should emit "login-submit" event with form data when form is submitted', async () => {
      // Arrange: Crear un espía para el evento "login-submit"
      const eventSpy = jest.fn();
      loginForm.addEventListener('login-submit', eventSpy);

      // Act: Simular la entrada de datos y el envío del formulario
      const emailInput = loginForm.shadowRoot?.querySelector('#user-input') as HTMLInputElement;
      const passwordInput = loginForm.shadowRoot?.querySelector('#password-input') as HTMLInputElement;
      emailInput.value = 'test@example.com';
      passwordInput.value = 'password123';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      const form = loginForm.shadowRoot?.querySelector('form') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));

      // Assert: Verificar que el evento 'login-submit' haya sido emitido correctamente
      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.mock.calls[0][0].detail).toEqual({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});