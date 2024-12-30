import { LitElement, ReactiveController, ReactiveControllerHost, html } from 'lit-element';
import { customElement, state } from 'lit/decorators.js';
import { PageTransitionsMixin } from '@open-cells/page-transitions';
import { PageController } from '@open-cells/page-controller';
import '../../../../shared/components/toolbar/toolbar';
import '../../../../components/dashboard/select-filter/select-filter';
import '../../../../shared/components/input-search/input-search';
import '../../components/table-countries';
import { Task } from '@lit/task';
import { ICountry } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { ISelectFilter } from '../../../../components/dashboard/interfaces/select-filter';


//@ts-ignore
@customElement('dashboard-countries-list-page')
export class CountriesPage extends PageTransitionsMixin(LitElement) implements ReactiveControllerHost {
  private _controllers = new Set<ReactiveController>();
  @state() private countries: ICountry[] = [];
  @state() private currentPage: number = 1;
  @state() private searchCountryByName: string = '';
  @state() private selectedRegion: string = '';; // Mantener la región seleccionada
  @state() private labelForSelection: string = 'Seleccione una región';
  @state() selectOptions: ISelectFilter[] = [
    { label: 'África', value: 'Africa' },
    { label: 'América', value: 'Americas' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Europa', value: 'Europe' },
    { label: 'Oceanía', value: 'Oceania' }
  ];
  private typeOfSearch: 'name' | 'region' | 'all'= 'all';
  private countriesPerPage: number = 5;
  private pageController: PageController;

  constructor() {
    super();
    this.pageController = new PageController(this);
  }

  addController(controller: ReactiveController): void {
    this._controllers.add(controller);
  }

  removeController(controller: ReactiveController): void {
    this._controllers.delete(controller);
  }

  requestUpdate(name?: PropertyKey, oldValue?: unknown): void {
    super.requestUpdate(name, oldValue);
  }

  get updateComplete(): Promise<boolean> {
    return super.updateComplete;
  }

  private async fetchCountries(signal: AbortSignal, typeOfSearch: 'name' | 'region' | 'all'): Promise<ICountry[]> {
    const countryMap: { [key: string]: () => Promise<ICountry[]> } = {
      'name': () => this.fetchByName(signal),
      'region': () => this.fetchByRegion(signal),
      'all': () => this.fetchAllCountries(signal),
    };
  
    // Ejecutar la función asociada con el tipo de búsqueda
    const searchFunction = countryMap[typeOfSearch];
    return searchFunction ? searchFunction() : this.fetchAllCountries(signal);
  }

  private async fetchByName(signal: AbortSignal): Promise<ICountry[]> {
    return await CountriesService.getInstance().searchCountriesByName(this.searchCountryByName, signal);
  }
  
  private async fetchByRegion(signal: AbortSignal): Promise<ICountry[]> {
    return await CountriesService.getInstance().searchCountriesByRegion(this.selectedRegion, signal);
  }
  
  private async fetchAllCountries(signal: AbortSignal): Promise<ICountry[]> {
    return await CountriesService.getInstance().getAllCountries(signal);
  }
  // La tarea ahora se encarga de manejar el estado de la carga
  private _countriesTask = new Task(this, {
    task: async (_: unknown, { signal }: { signal: AbortSignal }) => {
      try {
        const data = await this.fetchCountries(signal, this.typeOfSearch);
        this.countries = data;
        return this.currentCountries;
      } catch (error) {
        throw new Error('Error fetching countries: ' + (error instanceof Error ? error.message : String(error)));
      }
    },
    args: () => [],
  });

  private get currentCountries() {
    const indexOfLastCountry = this.currentPage * this.countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - this.countriesPerPage;
    return this.countries.slice(indexOfFirstCountry, indexOfLastCountry);
  }

  private nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.requestUpdate();
    }
  }

  private prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.requestUpdate();
    }
  }

  private get totalPages() {
    return Math.ceil(this.countries.length / this.countriesPerPage);
  }

  private navigate(path: string) {
    this.pageController.navigate(path);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // @ts-ignore
    return this; // No utilizamos Shadow DOM
  }

  connectedCallback() {
    super.connectedCallback();
    this._countriesTask.run(); // Ejecutamos la tarea al conectar el componente
    this.loadTransition();
  }

  private loadTransition(): void {
    this.pageTransitionType = 'verticalUp';
    this.pageTransitionDuration = 800;
  }

  handleSelectOption(event: CustomEvent) {
    const optionSelected = event.detail;
    this.selectedRegion = optionSelected.value; // Actualizamos la región seleccionada
    this.currentPage = 1; // Restablecemos la página a la 1
    this.typeOfSearch = 'region';
    this._countriesTask.run(); // Ejecutamos la tarea para actualizar los resultados

  }

  handleSearch(event: CustomEvent) {
    const searchValue = event.detail;
    this.searchCountryByName = searchValue;
    if(searchValue === '') {
      return;
    }
    this.typeOfSearch = 'name';
    this._countriesTask.run();
  }

  render() {
    return html`
      <!-- Toolbar -->
      <toolbar-component .onNavigate="${this.navigate.bind(this)}"></toolbar-component>
      <h2>Countries Page</h2>
      <div class="countries-list">
        ${this._countriesTask.render({
      pending: () => html`<p>Loading countries...</p>`,
      complete: (_) => html`
            <div class="countries-list_detail">
              <div class="input-search">
                <input-search placeholder="Búsqueda por País" @search="${this.handleSearch}"
                .selectedCountry="${this.searchCountryByName}"></input-search>
              </div>
              <div>
                <h1>Filtros</h1>
              </div>
              <div class="filters">
                <select-filter
                @option-selected="${this.handleSelectOption}"
                .labelForSelection="${this.labelForSelection}"
                .selectOptions="${this.selectOptions}" 
                .selectedRegion="${this.selectedRegion}"></select-filter >            
                </div>
              <div class="table-country">
                <table-countries .countries="${this.currentCountries}"></table-countries>
              </div>
              <div class="pagination">
                <button
                  class="page-button"
                  @click="${this.prevPage}"
                  ?disabled="${this.currentPage === 1}"
                >
                  Anterior
                </button>
                <span class="page-info">
                  Página ${this.currentPage} de ${this.totalPages}
                </span>
                <button
                  class="page-button"
                  @click="${this.nextPage}"
                  ?disabled="${this.currentPage === this.totalPages}"
                >
                  Siguiente
                </button>
              </div>
            </div>
           
          `,
      error: (e) => html`<p>Error: ${(e as Error).message}</p>`
    })}
      </div>
    `;
  }
}
