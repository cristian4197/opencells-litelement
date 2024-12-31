import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './select-filter';  // Asegúrate de que esta ruta sea correcta para importar tu componente

describe('SelectFilter Component', () => {
  let selectFilter: HTMLElement;

  const mockSelectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  beforeEach(async () => {
    // Crear el fixture del componente con las propiedades necesarias
    selectFilter = await fixture(html`<select-filter .selectOptions="${mockSelectOptions}"></select-filter>`);
  });

  it('should render correctly with the given select options', async () => {
    // Verifica que el componente ha sido renderizado
    const selectElement = selectFilter.shadowRoot?.querySelector('select');
    expect(selectElement).toBeTruthy();

    const options = selectElement?.querySelectorAll('option');
    expect(options?.length).toBe(mockSelectOptions.length + 1); // +1 por la opción predeterminada

    // Verifica que las opciones sean correctas
    mockSelectOptions.forEach((option, index) => {
      const renderedOption = options?.[index + 1];  // El primer option es la opción "Seleccione"
      expect(renderedOption?.value).toBe(option.value);
      expect(renderedOption?.textContent).toBe(option.label);
    });
  });

  it('should emit "option-selected" event when an option is selected', async () => {
    // Crea un espía para el evento "option-selected"
    const eventSpy = jest.fn();
    selectFilter.addEventListener('option-selected', eventSpy);

    // Simula el cambio de selección
    const selectElement = selectFilter.shadowRoot?.querySelector('select');
    if (selectElement) {
      selectElement.value = '2';  // Simula la selección de la opción "Option 2"
      selectElement.dispatchEvent(new Event('change'));  // Dispara el evento 'change'
    }

    // Espera a que el componente se actualice
    await (selectFilter as any).updateComplete;

    // Verifica que el evento 'option-selected' haya sido emitido correctamente
    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy.mock.calls[0][0].detail).toEqual({
      value: '2',
      label: 'Option 2'
    });
  });

  it('should reflect selected value in the select element', async () => {
    // Cambia la propiedad selectedRegion y verifica que se refleje en el select
    (selectFilter as any).selectedRegion = '3';
    await (selectFilter as any).updateComplete;

    const selectElement = selectFilter.shadowRoot?.querySelector('select');
    expect(selectElement?.value).toBe('3');  // Verifica que la opción seleccionada es la correcta
  });
});