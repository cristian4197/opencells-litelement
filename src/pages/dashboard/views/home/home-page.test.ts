import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers';
import { HomePage } from './home-page';
import { PageController } from '@open-cells/page-controller';

// Mock de PageController
jest.mock('@open-cells/page-controller', () => {
  return {
    PageController: jest.fn().mockImplementation(function (this: any) {
          this.navigate = jest.fn();
        }),
  };
});

// Mock para el componente toolbar
jest.mock('../../../../shared/components/toolbar/toolbar', () => ({
  ToolbarComponent: jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
  })),
}));

describe('HomePage Component', () => {
  let element: HomePage;

  beforeEach(async () => {
    // Arrange: Creamos el componente
    element = await fixture(html`<dashboard-home-page></dashboard-home-page>`);
  });

  it('debe inicializar correctamente', () => {
    expect(element).toBeInstanceOf(HomePage);
  });

  it('debe tener un PageController', () => {
    expect(element.pageController).toBeInstanceOf(PageController);
  });

  it('debe navegar a la ruta especificada', () => {
    const path = '/test-path';
    element.navigate(path);
    expect(element.pageController.navigate).toHaveBeenCalledWith(path);
  });

  it('debe renderizar correctamente', () => {
    const mainElement = element.shadowRoot?.querySelector('main');
    expect(mainElement).toBeTruthy();
  });

  it('debe renderizar el componente toolbar', () => {
    const toolbar = element.shadowRoot?.querySelector('toolbar-component');
    expect(toolbar).toBeTruthy();
  });

  it('debe renderizar el título', () => {
    const title = element.shadowRoot?.querySelector('h2');
    expect(title?.textContent).toBe('Dashboard Home');
  });
});