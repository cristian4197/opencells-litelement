import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './select-filter';  // Asegúrate de que esta ruta sea correcta para importar tu componente
import { SelectFilter } from './select-filter'; // Importa el tipo SelectFilter

describe('SelectFilter Component', () => {
  let selectFilter: SelectFilter;

  const mockSelectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  beforeEach(async () => {
    // Arrange: Crear el fixture del componente con las propiedades necesarias
    selectFilter = await fixture<SelectFilter>(html`<select-filter .selectOptions="${mockSelectOptions}"></select-filter>`);
  });

  describe('Render Tests', () => {
    it('should render correctly with the given select options', async () => {
      // Act: Obtener el elemento select del shadow DOM
      const selectElement = selectFilter.shadowRoot?.querySelector('select');

      // Assert: Verificar que el componente ha sido renderizado
      expect(selectElement).toBeTruthy();

      const options = selectElement?.querySelectorAll('option');
      expect(options?.length).toBe(mockSelectOptions.length + 1); // +1 por la opción predeterminada

      // Assert: Verificar que las opciones sean correctas
      mockSelectOptions.forEach((option, index) => {
        const renderedOption = options?.[index + 1];  // El primer option es la opción "Seleccione"
        expect(renderedOption?.value).toBe(option.value);
        expect(renderedOption?.textContent).toBe(option.label);
      });
    });
  });

  describe('Event Tests', () => {
    it('should emit "option-selected" event when an option is selected', async () => {
      // Arrange: Crear un espía para el evento "option-selected"
      const eventSpy = jest.fn();
      selectFilter.addEventListener('option-selected', eventSpy);

      // Act: Simular el cambio de selección
      const selectElement = selectFilter.shadowRoot?.querySelector('select');
      if (selectElement) {
        selectElement.value = '2';  // Simular la selección de la opción "Option 2"
        selectElement.dispatchEvent(new Event('change'));  // Disparar el evento 'change'
      }

      // Assert: Verificar que el evento 'option-selected' haya sido emitido correctamente
      expect(eventSpy).toHaveBeenCalledTimes(1);
      expect(eventSpy.mock.calls[0][0].detail).toEqual({
        value: '2',
        label: 'Option 2'
      });
    });
  });

  describe('Property Tests', () => {
    it('should reflect selected value in the select element', async () => {
      // Arrange: Cambiar la propiedad selectedRegion
      selectFilter.selectedRegion = '3';

      // Act: Esperar a que el componente se actualice
      await selectFilter.updateComplete;

      // Assert: Verificar que la opción seleccionada es la correcta
      const selectElement = selectFilter.shadowRoot?.querySelector('select');
      expect(selectElement?.value).toBe('3');
    });
  });
});