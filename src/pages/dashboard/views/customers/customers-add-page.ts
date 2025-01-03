import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import '../../../../shared/components/toolbar/toolbar';
import { Notify } from 'notiflix';
import { ICustomer } from '../../interfaces/customer';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { styles } from './customers-add-page.css.js';

// @ts-ignore
@customElement('dashboard-customers-add-page')
export class DasboardCustomerAddPage extends PageTransitionsMixin(LitElement) {
  pageController: PageController;
  static styles = styles;

  constructor() {
    super();
    this.pageController = new PageController(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // Definir el tipo de transición como 'verticalUp'
    this.loadTransition();
  }

  private loadTransition(): void {
    this.pageTransitionType = 'verticalUp';
    // Establecer la duración de la transición
    this.pageTransitionDuration = 800;
  }

  private hasError = false;

  @state() private formData: ICustomer = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
  };

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    this.formData = {
      ...this.formData,
      [name]: value,
    };
  }

  private saveClientToLocalStorage(client: ICustomer): void {
    const storedClients: ICustomer[] = JSON.parse(localStorage.getItem('clients') || '[]');

    // Validación: Verificar duplicados
    const exists = storedClients.some(
      (storedClient) =>
        storedClient.email === client.email || storedClient.phone === client.phone
    );

    //Validacion para que no se repita el cliente por email o telefono
    if (exists) {
      this.hasError = true;
      Notify.failure('Email/Telefono ya registrado. Intente con otro.');
      return;
    }

    const updatedClients = [...storedClients, client];
    this.hasError = false;

    // Guardar en localStorage
    localStorage.setItem('clients', JSON.stringify(updatedClients));

    // Publicar cambios
    this.pageController.publish('clients-updated', updatedClients);

    // Notificar al usuario
    Notify.success('Cliente registrado correctamente.', {
      timeout: 1500,
    });
  }



  private handleSubmit(e: Event) {
    e.preventDefault();

    const newClient = { ...this.formData };
    this.saveClientToLocalStorage(newClient);

    if (!this.hasError) {
      this.formData = {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
      };
    }

    console.log('Cliente registrado:', newClient);
  }

  // Función de navegación
  private navigate(path: string) {
    this.pageController.navigate(path);
  }


  render() {
    return html`
    <main>
         <!-- Toolbar -->
         <toolbar-component .onNavigate="${this.navigate.bind(this)}"></toolbar-component>
         <h2>Registrar Cliente</h2>
         <form @submit="${this.handleSubmit}">
           <div class="form-group">
             <label for="name">Nombres</label>
             <input
               type="text"
               id="name"
               name="name"
               .value="${this.formData.name}"
               @input="${this.handleChange}"
               placeholder="Ingresa los nombres"
               required
             />
           </div>
   
           <div class="form-group">
             <label for="lastName">Apellidos</label>
             <input
               type="text"
               id="lastName"
               name="lastName"
               .value="${this.formData.lastName}"
               @input="${this.handleChange}"
               placeholder="Ingresa los apellidos"
               required
             />
           </div>
   
           <div class="form-group">
             <label for="email">Email</label>
             <input
               type="email"
               id="email"
               name="email"
               .value="${this.formData.email}"
               @input="${this.handleChange}"
               placeholder="Ingresa el email"
               required
             />
           </div>
   
           <div class="form-group">
             <label for="phone">Teléfono</label>
             <input
               type="text"
               id="phone"
               name="phone"
               .value="${this.formData.phone}"
               @input="${this.handleChange}"
               placeholder="Ingresa el teléfono"
               required
             />
           </div>
   
           <div class="form-group">
             <label for="city">Ciudad</label>
             <input
               type="text"
               id="city"
               name="city"
               .value="${this.formData.city}"
               @input="${this.handleChange}"
               placeholder="Ingresa la ciudad"
               required
             />
           </div>
   
           <button type="submit" class="submit-btn">
             <!-- SVG icon for save -->
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
               <polyline points="12 17 17 12 12 7"></polyline>
               <line x1="12" y1="12" x2="12" y2="7"></line>
             </svg>
             Guardar Cliente
           </button>
         </form>
    </main>
    `;
  }
}
