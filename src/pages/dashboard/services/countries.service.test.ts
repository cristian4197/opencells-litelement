import { CountriesService } from './countries.service'; // Asegúrate de que esta ruta sea correcta para importar tu servicio
import { ICountry, Region } from '../interfaces/country';

describe('CountriesService', () => {
  let service: CountriesService;
  let mockFetch: jest.Mock;

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

  beforeEach(() => {
    // Arrange: Obtener la instancia del servicio y mockear fetch
    service = CountriesService.getInstance();
    mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockCountries)
    });
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllCountries', () => {
    it('should fetch and return all countries', async () => {
      // Arrange: Crear un AbortSignal mock
      const mockSignal = new AbortController().signal;

      // Act: Llamar al método getAllCountries
      const countries = await service.getAllCountries(mockSignal);

      // Assert: Verificar que fetch fue llamado correctamente
      expect(mockFetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all?fields=name,currencies,capital,region,languages,latlng,area,flags', { signal: mockSignal });
      expect(countries).toEqual(mockCountries);
    });

    it('should handle fetch errors', async () => {
      // Arrange: Mockear fetch para que lance un error
      mockFetch.mockRejectedValue(new Error('Fetch error'));

      // Act & Assert: Verificar que el método lanza un error
      const mockSignal = new AbortController().signal;
      await expect(service.getAllCountries(mockSignal)).rejects.toThrow('Fetch error');
    });
  });

  describe('searchCountriesByName', () => {
    it('should fetch and return countries by name', async () => {
      // Arrange: Crear un AbortSignal mock
      const mockSignal = new AbortController().signal;
      const query = 'Country 1';

      // Act: Llamar al método searchCountriesByName
      const countries = await service.searchCountriesByName(query, mockSignal);

      // Assert: Verificar que fetch fue llamado correctamente
      expect(mockFetch).toHaveBeenCalledWith(`https://restcountries.com/v3.1/name/${query}?fields=name,currencies,capital,region,languages,latlng,area,flags`, { signal: mockSignal });
      expect(countries).toEqual(mockCountries);
    });

    it('should handle fetch errors', async () => {
      // Arrange: Mockear fetch para que lance un error
      mockFetch.mockRejectedValue(new Error('Fetch error'));

      // Act & Assert: Verificar que el método lanza un error
      const mockSignal = new AbortController().signal;
      const query = 'Country 1';
      await expect(service.searchCountriesByName(query, mockSignal)).rejects.toThrow('Fetch error');
    });
  });

  describe('searchCountriesByRegion', () => {
    it('should fetch and return countries by region', async () => {
      // Arrange: Crear un AbortSignal mock
      const mockSignal = new AbortController().signal;
      const query = 'Region 1';

      // Act: Llamar al método searchCountriesByRegion
      const countries = await service.searchCountriesByRegion(query, mockSignal);

      // Assert: Verificar que fetch fue llamado correctamente
      expect(mockFetch).toHaveBeenCalledWith(`https://restcountries.com/v3.1/region/${query}?fields=name,currencies,capital,region,languages,latlng,area,flags`, { signal: mockSignal });
      expect(countries).toEqual(mockCountries);
    });

    it('should handle fetch errors', async () => {
      // Arrange: Mockear fetch para que lance un error
      mockFetch.mockRejectedValue(new Error('Fetch error'));

      // Act & Assert: Verificar que el método lanza un error
      const mockSignal = new AbortController().signal;
      const query = 'Region 1';
      await expect(service.searchCountriesByRegion(query, mockSignal)).rejects.toThrow('Fetch error');
    });
  });
});