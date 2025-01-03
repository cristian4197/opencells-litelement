// import { html } from 'lit';
// import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
// import './config-page';  // Asegúrate de que esta ruta sea correcta para importar tu componente
// import { assert } from 'chai'; // Importa la función assert de chai
// import { DasboardConfigPage } from './config-page'; // Importa el tipo DasboardConfigPage

// jest.mock('@open-cells/page-controller', () => {
//   return {
//     PageController: jest.fn().mockImplementation(() => {
//       return {
//         navigate: jest.fn(),
//       };
//     }),
//   };
// });

// describe('DasboardConfigPage Component', () => {
//   let configPage: DasboardConfigPage;

//   beforeEach(async () => {
//     // Arrange: Crear el fixture del componente con las propiedades necesarias
//     configPage = await fixture(html`<dashboard-config-page></dashboard-config-page>`) as unknown as DasboardConfigPage;
//   });

//   describe('Render Tests', () => {
//     it('should render correctly', async () => {
//       // Act: Obtener el elemento principal del shadow DOM
//       const mainElement = configPage.querySelector('main');

//       // Assert: Verificar que el componente ha sido renderizado
//       assert.exists(mainElement, 'El elemento main debería existir');
//     });
//   });

//   describe('Lifecycle Tests', () => {
//     it('should call loadTransition on connectedCallback', async () => {
//       // Arrange: Espiar el método loadTransition
//       const loadTransitionSpy = jest.spyOn(configPage as any, 'loadTransition');

//       // Act: Conectar el componente
//       document.body.appendChild(configPage as unknown as Node);

//       // Assert: Verificar que loadTransition fue llamado
//       expect(loadTransitionSpy).toHaveBeenCalled();
//     });
//   });

//   describe('Navigation Tests', () => {
//     it('should call navigate on pageController when navigate is called', async () => {
//       // Arrange: Obtener el mock de navigate
//       const navigateMock = (configPage.pageController.navigate as jest.Mock);

//       // Act: Llamar al método navigate
//       const path = '/some-path';
//       (configPage as any).navigate(path);

//       // Assert: Verificar que navigate fue llamado con el path correcto
//       expect(navigateMock).toHaveBeenCalledWith(path);
//     });
//   });

//   describe('Transition Tests', () => {
//     it('should set pageTransitionType and pageTransitionDuration correctly', async () => {
//       // Act: Llamar al método loadTransition
//       (configPage as any).loadTransition();

//       // Assert: Verificar que las propiedades de transición fueron establecidas correctamente
//       expect((configPage as any).pageTransitionType).toBe('verticalUp');
//       expect((configPage as any).pageTransitionDuration).toBe(800);
//     });
//   });
// });

import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './config-page';  // Asegúrate de que esta ruta sea correcta para importar tu componente
import { assert } from 'chai'; // Importa la función assert de chai
import { DasboardConfigPage } from './config-page'; // Importa el tipo DasboardConfigPage

jest.mock('@open-cells/page-controller', () => {
  return {
    PageController: jest.fn().mockImplementation(() => {
      return {
        navigate: jest.fn(),
      };
    }),
  };
});

describe('DasboardConfigPage Component', () => {
  let configPage: DasboardConfigPage;

  beforeEach(async () => {
    // Arrange: Crear el fixture del componente con las propiedades necesarias
    configPage = await fixture(html`<dashboard-config-page></dashboard-config-page>`) as unknown as DasboardConfigPage;
  });

  describe('Render Tests', () => {
    it('should render correctly', async () => {
      // Act: Obtener el elemento principal del DOM
      const mainElement = configPage.querySelector('main');

      // Assert: Verificar que el componente ha sido renderizado
      assert.exists(mainElement, 'El elemento main debería existir');
    });
  });

  describe('Lifecycle Tests', () => {
    it('should call loadTransition on connectedCallback', async () => {
      // Arrange: Espiar el método loadTransition
      const loadTransitionSpy = jest.spyOn(configPage as any, 'loadTransition');

      // Act: Conectar el componente
      document.body.appendChild(configPage as unknown as Node);

      // Assert: Verificar que loadTransition fue llamado
      expect(loadTransitionSpy).toHaveBeenCalled();
    });
  });

  describe('Navigation Tests', () => {
    it('should call navigate on pageController when navigate is called', async () => {
      // Arrange: Obtener el mock de navigate
      const navigateMock = (configPage.pageController.navigate as jest.Mock);

      // Act: Llamar al método navigate
      const path = '/some-path';
      (configPage as any).navigate(path);

      // Assert: Verificar que navigate fue llamado con el path correcto
      expect(navigateMock).toHaveBeenCalledWith(path);
    });
  });

  describe('Transition Tests', () => {
    it('should set pageTransitionType and pageTransitionDuration correctly', async () => {
      // Act: Llamar al método loadTransition
      (configPage as any).loadTransition();

      // Assert: Verificar que las propiedades de transición fueron establecidas correctamente
      expect((configPage as any).pageTransitionType).toBe('verticalUp');
      expect((configPage as any).pageTransitionDuration).toBe(800);
    });
  });
});