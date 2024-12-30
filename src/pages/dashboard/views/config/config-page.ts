import { html, LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';
import '../../../../shared/components/toolbar/toolbar';

import { PageTransitionsMixin } from '@open-cells/page-transitions';

// @ts-ignore
@customElement('dashboard-config-page')
export class DasboardConfigPage extends PageTransitionsMixin(LitElement) {
  pageController: PageController;

  constructor() {
    super();
    this.pageController = new PageController(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // Ahora que el componente está conectado, define la transición
    this.loadTransition();
  }

  private loadTransition(): void {
    this.pageTransitionType = 'verticalUp';
    // Establecer la duración de la transición
    this.pageTransitionDuration = 800;
  }


  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this;
  }

  // Función de navegación
  private navigate(path: string) {
    this.pageController.navigate(path);
  }


  render() {
    return html`
         <!-- Toolbar -->
         <toolbar-component .onNavigate="${this.navigate.bind(this)}"></toolbar-component>

      <h2>Dashboard Config</h2>
    `;
  }
}
