import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement, state } from 'lit/decorators.js';
import '../../../../shared/components/toolbar/toolbar';
import { ICustomer } from '../../interfaces/customer';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { styles } from './customers-list-page.css';


// @ts-ignore
@customElement('dashboard-customers-list-page')
export class DashboardCustomerListPage extends PageTransitionsMixin(LitElement) {
  pageController: PageController;

   static styles = styles;

  @state() private clients: ICustomer[] = [];
  @state() private currentPage: number = 1;
  private clientsPerPage: number = 5;
  private clientUpdateSubscription: string | null = null;

  constructor() {
    super();
    this.pageController = new PageController(this);
    // Suscribirse al canal 'clients-updated' solo una vez
    this.subscribeToClientUpdates();
  }

  connectedCallback() {
    super.connectedCallback();
    // Ahora que el componente está conectado, define la transición
    this.loadTransition();
    // Al conectarse, actualizar el estado con los clientes actuales
    this.loadClients();
  }

  private loadTransition(): void {
    this.pageTransitionType = 'verticalUp';
    // Establecer la duración de la transición
    this.pageTransitionDuration = 800;
  }

  private loadClients() {
    const storedClients: ICustomer[] = JSON.parse(localStorage.getItem('clients') || '[]');
    this.clients = storedClients;
  }

  private subscribeToClientUpdates() {
    const channelName = 'clients-updated';
    this.clientUpdateSubscription = channelName;
    // Suscribirse al canal solo una vez
    this.pageController.subscribe(channelName, (updatedClients: ICustomer[]) => {
      // Actualizamos los clientes solo si los datos cambiaron
      if (this.clients !== updatedClients) {
        this.clients = updatedClients;
      }
    });
  }

  private unsubscribeFromClientUpdates() {
    if (this.clientUpdateSubscription) {
      this.pageController.unsubscribe(this.clientUpdateSubscription);
      this.clientUpdateSubscription = null; // Limpia la referencia
    }
  }

  private get currentClients() {
    const indexOfLastClient = this.currentPage * this.clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - this.clientsPerPage;
    return this.clients.slice(indexOfFirstClient, indexOfLastClient);
  }

  private nextPage() {
    if (this.currentPage < Math.ceil(this.clients.length / this.clientsPerPage)) {
      this.currentPage++;
    }
  }

  private prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private get totalPages() {
    return Math.ceil(this.clients.length / this.clientsPerPage);
  }

  // Función de navegación
  private navigate(path: string) {
    this.pageController.navigate(path);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeFromClientUpdates(); // Cancelar la suscripción
  }

  render() {
    return html`
    <main>
          <!-- Toolbar -->
          <toolbar-component .onNavigate="${this.navigate.bind(this)}"></toolbar-component>
          <div class="home">
            <div class="h4">Clientes Registrados</div>
    
            <table class="user-table">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody>
                ${this.currentClients.length === 0
            ? html`
                      <tr>
                        <td colspan="5" class="no-users">No hay usuarios registrados.</td>
                      </tr>
                    `
            : this.currentClients.map(
              (client, index) => html`
                        <tr key="${index}">
                          <td>${client.name}</td>
                          <td>${client.lastName}</td>
                          <td>${client.email}</td>
                          <td>${client.phone}</td>
                          <td>${client.city}</td>
                        </tr>
                      `
            )}
              </tbody>
            </table>
    
            <div class="pagination">
              <button
                class="page-button"
                @click="${this.prevPage}"
                ?disabled="${this.currentPage === 1}"
              >
                Anterior
              </button>
    
              <span class="page-info">
                Página ${this.currentPage} de ${this.totalPages}
              </span>
    
              <button
                class="page-button"
                @click="${this.nextPage}"
                ?disabled="${this.currentPage === this.totalPages}"
              >
                Siguiente
              </button>
            </div>
          </div>
    </main>
     
    `;
  }
}
