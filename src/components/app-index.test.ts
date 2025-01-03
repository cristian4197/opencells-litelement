import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './app-index';  // Asegúrate de que esta ruta sea correcta para importar tu componente
import { AppIndex } from './app-index'; // Importa el tipo AppIndex
import { ElementController } from '@open-cells/element-controller';

jest.mock('@open-cells/page-controller', () => {
  return {
    PageController: jest.fn().mockImplementation(() => {
      return {
        // Puedes simular métodos de la instancia de PageController si es necesario
        navigate: jest.fn(),
      };
    }),
  };
});
// Mockear startApp de @open-cells/core
jest.mock('@open-cells/core', () => ({
  startApp: jest.fn(),
}));

jest.mock('@open-cells/element-controller', () => {
  return {
    ElementController: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe('AppIndex Component', () => {
  let appIndex: AppIndex;
  let appContent: HTMLElement;

  beforeAll(() => {
    // Crear un contenedor temporal en el DOM
    appContent = document.createElement('div');
    appContent.id = 'app-content';
    document.body.appendChild(appContent);
  });

  afterAll(() => {
    // Eliminar el contenedor temporal del DOM
    document.body.removeChild(appContent);
  });

  beforeEach(async () => {
    // Arrange: Crear el fixture del componente con las propiedades necesarias
    appIndex = await fixture<AppIndex>(html`<app-index></app-index>`);
  });

  describe('Render Tests', () => {
    it('should render correctly', async () => {
      // Act: Obtener el elemento main del shadow DOM
      const mainElement = appIndex.shadowRoot?.querySelector('main');

      // Assert: Verificar que el componente ha sido renderizado
      expect(mainElement).toBeTruthy();
    });

    it('should have a slot element inside main', async () => {
      // Act: Obtener el elemento slot del shadow DOM
      const slotElement = appIndex.shadowRoot?.querySelector('slot');

      // Assert: Verificar que el slot ha sido renderizado dentro del main
      expect(slotElement).toBeTruthy();
    });
  });

  describe('Property Tests', () => {
    it('should initialize ElementController', async () => {
      // Assert: Verificar que ElementController ha sido inicializado
      expect(ElementController).toHaveBeenCalledWith(appIndex);
    });
  });

  describe('Styles Tests', () => {
    it('should have static styles defined', async () => {
      // Assert: Verificar que las styles están definidas
      expect(AppIndex.styles).toBeDefined();
    });
  });
});