import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ToolbarState } from './toolbar.state';
import { getMenuItems } from './menu';

@customElement('toolbar-component')
export class ToolbarComponent extends LitElement {
  @property({ type: Function }) onNavigate: (path: string) => void = () => { };
  @state() private menuOpen: boolean = false;
  private toolbarState = ToolbarState.getInstance(); // Acceso al singleton


  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .toolbar {
      display: flex;
      flex-direction: column;
      background-color: #1e293b;
      color: white;
      padding: 10px 20px;
      box-sizing: border-box;
    }

    .toolbar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .menu-toggle {
      cursor: pointer;
      font-size: 24px;
      color: white;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .menus {
      display: none;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }

    .menus.open {
      display: flex;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 15px;
      text-decoration: none;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      padding: 10px 20px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      cursor: pointer;
    }

    .menu-item:hover {
      background-color: #e63946; /* Color rojo solo en hover */
    }

    .icon {
      font-size: 1.2rem;
    }

    .active {
      background-color: rgb(215, 213, 213) !important;
    }

  
  `;

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private closeMenu() {
    this.menuOpen = false;
  }

  private selectMenu(path: string) {
    this.toolbarState.activeMenu = path;
    if (path != 'login') {
      localStorage.setItem('activeMenu', this.toolbarState.activeMenu);
      this.clearSession(path);
      return;
    }

  }

  private clearSession(path: string) {
    this.closeMenu();
    this.onNavigate(path);
  }

  private closeSession() {
    this.closeMenu();
    //Reseteamos el menu activo a dashboard-home
    localStorage.setItem('activeMenu', 'dashboard-home');
    this.toolbarState.activeMenu = 'dashboard-home';
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    this.onNavigate('login');
  }


  render() {
    const menuItems = getMenuItems();
    return html`
      <div class="toolbar">
        <!-- Título del Toolbar y Botón de Menú -->
        <div class="toolbar-header">
          <div class="title">Sistema Clientes</div>
          <div class="menu-toggle" @click=${this.toggleMenu}>☰</div>
        </div>
        <!-- Opciones del Menú -->
        <!-- Opciones del Menú -->
        <div class="menus ${this.menuOpen ? 'open' : ''}">
          ${menuItems.map(
      menu => html`
              <div
              class="menu-item ${this.toolbarState.activeMenu === menu.path ? 'active' : ''}"
              @click=${() =>
          menu.path === 'login'
            ? this.closeSession()
            : this.selectMenu(menu.path)}
              >
              <span class="icon"><img src="${menu.icon}" alt="Icon"></span>
              <span>${menu.name}</span>
            </div>
            `
    )}
        </div>
      </div>
    `;
  }
}
