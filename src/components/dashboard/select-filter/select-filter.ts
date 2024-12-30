import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './select-filter.css.js';
import { ISelectFilter } from '../interfaces/select-filter.js';

@customElement('select-filter')
export class SelectFilter extends LitElement {
  static styles = styles;

  @property({ type: Array }) selectOptions: ISelectFilter[] = [];
  @property({ type: String }) labelForSelection = 'Seleccione';
  @property({ type: String }) selectedRegion = ''; // Esta propiedad se enlaza con la región seleccionada

  onSelectionOptionChange(event: CustomEvent) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const selectedOption = this.selectOptions.find(option => option.value === selectedValue);
    
  
    // Si la opción es encontrada, se envía el evento con el valor y el label
    if (selectedOption) {
      this.dispatchEvent(new CustomEvent('option-selected', {
        detail: {
          value: selectedValue,
          label: selectedOption.label
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  
  render() {
    return html`
      <div class="select-filter">
        <label for="opciones" >${this.labelForSelection}</label>
        <select id="opciones" name="opciones"
          @change="${this.onSelectionOptionChange}"
          .value="${this.selectedRegion}">
          <option value="" selected disabled>Seleccione Valor</option>
          ${this.selectOptions.map(
            option => html`<option value="${option.value}" ?selected="${this.selectedRegion === option.value}">${option.label}</option>`
          )}
        </select>
      </div>
    `;
  }
}
