import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers'; // Helper para crear el fixture y probar LitElement
import './table-countries';  // Asegúrate de que esta ruta sea correcta para importar tu componente
import { TableCountries } from './table-countries'; // Importa el tipo TableCountries
import { ICountry, Region } from '../interfaces/country';

describe('TableCountries Component', () => {
  let tableCountries: TableCountries;

  const mockCountries: ICountry[] = [
    {
      name: { common: 'Country 1', official: 'Official Country 1', nativeName: { native: { official: 'Native Official Country 1', common: 'Native Country 1' } } },
      capital: ['Capital 1'],
      languages: { lang1: 'Language 1' },
      region: 'Region 1' as Region,
      area: 1000,
      currencies: { curr1: { name: 'Currency 1', symbol: 'C1' } },
      flags: { svg: 'flag1.svg', png: 'flag1.png', alt: 'Flag 1' },
      latlng: [10, 20]
    },
    {
      name: { common: 'Country 2', official: 'Official Country 2', nativeName: { native: { official: 'Native Official Country 2', common: 'Native Country 2' } } },
      capital: ['Capital 2'],
      languages: { lang2: 'Language 2' },
      region: 'Region 2' as Region,
      area: 2000,
      currencies: { curr2: { name: 'Currency 2', symbol: 'C2' } },
      flags: { svg: 'flag2.svg', png: 'flag2.png', alt: 'Flag 2' },
      latlng: [30, 40]
    }
  ];

  beforeEach(async () => {
    // Arrange: Crear el fixture del componente con las propiedades necesarias
    tableCountries = await fixture<TableCountries>(html`<table-countries .countries="${mockCountries}"></table-countries>`);
  });

  describe('Render Tests', () => {
    it('should render correctly with the given countries', async () => {
      // Act: Obtener el elemento tbody del shadow DOM
      const tbodyElement = tableCountries.shadowRoot?.querySelector('tbody');

      // Assert: Verificar que el componente ha sido renderizado
      expect(tbodyElement).toBeTruthy();

      const rows = tbodyElement?.querySelectorAll('tr');
      expect(rows?.length).toBe(mockCountries.length); // Verificar que se renderizan las filas correctas

      // Assert: Verificar que los datos de los países sean correctos
      mockCountries.forEach((country, index) => {
        const row = rows?.[index];
        const cells = row?.querySelectorAll('td');
        expect(cells?.[0].textContent?.trim()).toBe(country.name.common);
        expect(cells?.[1].textContent?.trim()).toBe(country.capital.join(', ')); // Unir los valores del array con una coma
        expect(cells?.[2].textContent?.trim()).toBe(Object.values(country.languages).join(', '));
        expect(cells?.[3].textContent?.trim()).toBe(country.region);
        expect(cells?.[4].textContent?.trim()).toBe(country.area.toString());
        expect(cells?.[5].textContent?.trim()).toBe(Object.values(country.currencies).map(currency => currency.name).join(', '));
        expect(cells?.[6].querySelector('img')?.getAttribute('src')).toBe(country.flags.svg);
        expect(cells?.[7].textContent?.trim()).toBe(country.latlng.join(', ')); // Unir los valores del array con una coma y un espacio
      });
    });

    it('should render "No hay países registrados." when no countries are provided', async () => {
      // Arrange: Crear el fixture del componente sin países
      tableCountries = await fixture<TableCountries>(html`<table-countries .countries="${[]}"></table-countries>`);

      // Act: Obtener el elemento tbody del shadow DOM
      const tbodyElement = tableCountries.shadowRoot?.querySelector('tbody');

      // Assert: Verificar que se muestra el mensaje de "No hay países registrados."
      const noCountriesRow = tbodyElement?.querySelector('.no-countries');
      expect(noCountriesRow).toBeTruthy();
      expect(noCountriesRow?.textContent?.trim()).toBe('No hay países registrados.');
    });
  });
});