import { LitElement, html } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './table-countries.css';
import { ICountry } from '../interfaces/country';

// @ts-ignore
@customElement('table-countries')
export class TableCountries extends LitElement {
  static styles = styles;
  @property({ type: Array }) countries: ICountry[] = [];


  render() {
    return html`
    <table class="countries-table">
    <thead>
      <tr>
        <th>Pais</th>
        <th>Capital</th>
        <th>Idioma</th>
        <th>Región</th>
        <th>Area</th>
        <th>Moneda</th>
        <th>Bandera</th>
        <th>Coordenadas</th>
      </tr>
    </thead>
    <tbody>
      ${this.countries.length === 0
        ? html`
              <tr>
                <td colspan="8" class="no-countries">No hay países registrados.</td>
              </tr>
            `
        : this.countries.map(
          (country, index) => html`
                <tr key="${index}">
                  <td>${country.name.common}</td>
                  <td>${country.capital}</td>
                  <td>
                    ${Object.values(country.languages).join(', ')} <!-- Aquí se muestran todos los idiomas -->
                  </td>
                  <td>${country.region}</td>
                  <td>${country.area}</td>
                  <td>
                  ${country.currencies 
                    ? Object.values(country.currencies).map(currency => currency.name).join(', ') 
                    : 'No disponible'}
                  </td>
                  <td><img src="${country.flags.svg}" class="flag" alt="flag"></td>
                  <td>${country.latlng}</td>
                </tr>
              `
        )
      }
    </tbody>
  </table>
    `;
  }
}