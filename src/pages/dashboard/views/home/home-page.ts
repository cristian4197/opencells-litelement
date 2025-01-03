import { html, LitElement } from 'lit-element';
import { PageController } from '@open-cells/page-controller';
import { customElement } from 'lit/decorators.js';

import '../../../../shared/components/toolbar/toolbar';

// @ts-ignore
@customElement('dashboard-home-page')
export class HomePage extends LitElement {
  pageController: PageController;

  constructor() {
    super();
    this.pageController = new PageController(this);
  }

  // Función de navegación
  public navigate(path: string) {
    this.pageController.navigate(path);
  }


  render() {
    return html`
    <main>
      <!-- Toolbar -->
      <toolbar-component .onNavigate="${this.navigate.bind(this)}"></toolbar-component>

      <h2>Dashboard Home</h2>
    </main>

    `;
  }
}
