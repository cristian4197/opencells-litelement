import { startApp } from '@open-cells/core';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { routes } from '../router/routes.js';
import { styles } from './app-index.css.js';
import { InterceptorFunction } from '@open-cells/core/types/bridge.js';
import { interceptor } from '../router/interceptors/auth.interceptor.js';

startApp({
  routes,
  mainNode: 'app-content',
  interceptor: interceptor as unknown as InterceptorFunction,
});

@customElement('app-index')
export class AppIndex extends LitElement {
  
  elementController = new ElementController(this);

  static styles = styles;

  render() {
    return html`
      <main role="main" tabindex="-1">
        <slot></slot>
      </main>
    `;
  }
}
