import { ICountry } from "../interfaces/country";

// countries.service.ts
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private static instance: CountriesService;

  private constructor() {}

  //Patron Singleton
  public static getInstance(): CountriesService {
    if (!CountriesService.instance) {
      CountriesService.instance = new CountriesService();
    }
    return CountriesService.instance;
  }

  async getAllCountries(signal: AbortSignal): Promise<ICountry[]> {
    const fields = ['name', 'currencies', 'capital', 'region', 'languages', 'latlng', 'area', 'flags'];
    const response = await fetch(`${this.baseUrl}/all?fields=${fields.join(',')}`, { signal });
    if (!response.ok) {
      throw new Error(String(response.status));
    }
    return await response.json();
  }

   // Buscar países por nombre o región
   async searchCountriesByName(query: string, signal: AbortSignal): Promise<ICountry[]> {
    const fields = ['name', 'currencies', 'capital', 'region', 'languages', 'latlng', 'area', 'flags'];
    const url = `${this.baseUrl}/name/${query}?fields=${fields.join(',')}`; // Buscamos por nombre o región
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Error al buscar países: ${response.status}`);
    }
    return await response.json();
  }

  // Buscar países por nombre o región
  async searchCountriesByRegion(query: string, signal: AbortSignal): Promise<ICountry[]> {
    const fields = ['name', 'currencies', 'capital', 'region', 'languages', 'latlng', 'area', 'flags'];
    const url = `${this.baseUrl}/region/${query}?fields=${fields.join(',')}`; // Buscamos por nombre o región
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Error al buscar países: ${response.status}`);
    }
    return await response.json();
  }
}
