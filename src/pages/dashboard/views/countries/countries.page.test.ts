import { html } from 'lit';
import { CountriesPage } from './countries.page';
import { PageController } from '@open-cells/page-controller';
import { fixture } from '@open-wc/testing-helpers';

// Mock de PageController
jest.mock('@open-cells/page-controller', () => {
  return {
    PageController: jest.fn().mockImplementation(function (this: any) {
          this.navigate = jest.fn();
        }),
  };
});

// Mock para los servicios
jest.mock('../../services/countries.service', () => {
  return {
    CountriesService: {
      getInstance: jest.fn().mockReturnValue({
        searchCountriesByName: jest.fn().mockResolvedValue([{ name: 'Argentina' }, { name: 'Brazil' }]),
        searchCountriesByRegion: jest.fn().mockResolvedValue([{ name: 'Germany' }, { name: 'France' }]),
        getAllCountries: jest.fn().mockResolvedValue([{ name: 'USA' }, { name: 'Canada' }])
      })
    }
  };
});

// Mock para los componentes importados
jest.mock('../../../../shared/components/toolbar/toolbar', () => ({
  ToolbarComponent: jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
  })),
}));

jest.mock('../../../../components/dashboard/select-filter/select-filter', () => ({
  SelectFilter: jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
  })),
}));

jest.mock('../../../../shared/components/input-search/input-search', () => ({
  InputSearch: jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
  })),
}));

jest.mock('../../components/table-countries', () => ({
  TableCountries: jest.fn().mockImplementation(() => ({})),
}));

describe('CountriesPage Component', () => {
  let element: CountriesPage;

  beforeEach(async () => {
    // Arrange: Creamos el componente
    element = await fixture(html`<dashboard-countries-list-page></dashboard-countries-list-page>`) as unknown as CountriesPage;

    // Mockeamos la ejecución de la tarea _countriesTask
    const mockRun = jest.fn();
    
    // Simulamos _countriesTask solo en el componente
    (element as any)._countriesTask = {
      run: mockRun,
      render: jest.fn(({ complete, pending, error }) => {
        // Simula la lógica de renderizado de la tarea
        return complete ? html`
          <div class="countries-list_detail">
            <div class="input-search">
              <input-search placeholder="Búsqueda por País"></input-search>
            </div>
            <div class="filters-title">
              <h3>Filtros</h3>
            </div>
            <div class="filters">
              <select-filter></select-filter>
            </div>
            <div class="table-country">
              <table-countries></table-countries>
            </div>
            <div class="pagination">
              <button class="page-button" disabled>Anterior</button>
              <span class="page-info">Página 1 de 1</span>
              <button class="page-button">Siguiente</button>
            </div>
          </div>
        ` : pending ? html`<p>Loading countries...</p>` : error ? html`<p>Error: ${(error as Error).message}</p>` : null;
      }),
    };

    // Esperamos que el componente termine de renderizar
    await element.updateComplete;
  });

  describe('Initialization', () => {
    it('should initialize correctly', () => {
      expect(element).toBeInstanceOf(CountriesPage);
    });

    it('should have a PageController', () => {
      expect((element as any).pageController).toBeInstanceOf(PageController);
    });

    it('should run _countriesTask on connectedCallback', () => {
      element.connectedCallback();
      expect((element as any)._countriesTask.run).toHaveBeenCalled();
    });
  });

  describe('Navigation', () => {
    it('should navigate to the specified path', () => {
      const path = '/test-path';
      (element as any).navigate(path);
      expect((element as any).pageController.navigate).toHaveBeenCalledWith(path);
    });
  });

  describe('Event Handling', () => {
    it('should handle option selection', () => {
      const event = new CustomEvent('option-selected', { detail: { value: 'Europe' } });
      element.handleSelectOption(event);
      expect((element as any).selectedRegion).toBe('Europe');
      expect((element as any)._countriesTask.run).toHaveBeenCalled();
    });

    it('should handle search', () => {
      const event = new CustomEvent('search', { detail: 'Argentina' });
      element.handleSearch(event);
      expect((element as any).searchCountryByName).toBe('Argentina');
      expect((element as any)._countriesTask.run).toHaveBeenCalled();
    });
  });

  describe('Rendering', () => {
    it('should render correctly', () => {
      const mainElement = element.shadowRoot?.querySelector('main');
      expect(mainElement).toBeTruthy();
    });

    it('should render toolbar component', () => {
      const toolbar = element.shadowRoot?.querySelector('toolbar-component');
      expect(toolbar).toBeTruthy();
    });

    it('should render input search component', () => {
      const inputSearch = element.shadowRoot?.querySelector('input-search');
      expect(inputSearch).toBeTruthy();
    });

    it('should render select filter component', () => {
      const selectFilter = element.shadowRoot?.querySelector('select-filter');
      expect(selectFilter).toBeTruthy();
    });

    it('should render table countries component', () => {
      const tableCountries = element.shadowRoot?.querySelector('table-countries');
      expect(tableCountries).toBeTruthy();
    });

    it('should render pagination buttons', () => {
      const prevButton = element.shadowRoot?.querySelector('.page-button[disabled]');
      const nextButton = element.shadowRoot?.querySelector('.page-button:not([disabled])');
      expect(prevButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
    });
  });

  describe('Pagination', () => {
    it('should change to the next page', () => {
      (element as any).countries = Array(10).fill({ name: 'Country' }); // Simulate 10 countries
      (element as any).currentPage = 1;
      (element as any).nextPage();
      expect((element as any).currentPage).toBe(2);
    });

    it('should change to the previous page', () => {
      (element as any).countries = Array(10).fill({ name: 'Country' }); // Simulate 10 countries
      (element as any).currentPage = 2;
      (element as any).prevPage();
      expect((element as any).currentPage).toBe(1);
    });

    it('should calculate total pages correctly', () => {
      (element as any).countries = Array(10).fill({ name: 'Country' }); // Simulate 10 countries
      expect((element as any).totalPages).toBe(2);
    });

    it('should get current countries correctly', () => {
      (element as any).countries = Array(10).fill({ name: 'Country' }); // Simulate 10 countries
      (element as any).currentPage = 1;
      expect((element as any).currentCountries.length).toBe(5);
      (element as any).currentPage = 2;
      expect((element as any).currentCountries.length).toBe(5);
    });
  });

  describe('Fetching Countries', () => {
    it('should fetch countries by name', async () => {
      const countries = await (element as any).fetchByName(new AbortController().signal);
      expect(countries).toEqual([{ name: 'Argentina' }, { name: 'Brazil' }]);
    });

    it('should fetch countries by region', async () => {
      const countries = await (element as any).fetchByRegion(new AbortController().signal);
      expect(countries).toEqual([{ name: 'Germany' }, { name: 'France' }]);
    });

    it('should fetch all countries', async () => {
      const countries = await (element as any).fetchAllCountries(new AbortController().signal);
      expect(countries).toEqual([{ name: 'USA' }, { name: 'Canada' }]);
    });

    it('should fetch countries based on search type', async () => {
      const signal = new AbortController().signal;
      let countries = await (element as any).fetchCountries(signal, 'name');
      expect(countries).toEqual([{ name: 'Argentina' }, { name: 'Brazil' }]);
      countries = await (element as any).fetchCountries(signal, 'region');
      expect(countries).toEqual([{ name: 'Germany' }, { name: 'France' }]);
      countries = await (element as any).fetchCountries(signal, 'all');
      expect(countries).toEqual([{ name: 'USA' }, { name: 'Canada' }]);
    });
  });
});