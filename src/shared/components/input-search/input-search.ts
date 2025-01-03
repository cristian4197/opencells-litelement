import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-search')
export class InputSearchComponent extends LitElement {
  static styles = css`
  :host {
    display: block;
  }

  .search-container {
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 6px 12px;
    width: 100%;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s, background-color 0.3s;
  }

  .search-container:focus-within {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: #fff;
  }

  input[type="text"] {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
    color: #333;
    background-color: transparent;
    padding: 4px 8px;
    font-family: 'Arial', sans-serif;
  }

  input[type="text"]::placeholder {
    color: #bbb;
    font-style: italic;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin-left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: color 0.3s;
  }

  button:hover {
    color: #007bff;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  @media (max-width: 600px) {
    .search-container {
      max-width: 100%;
      padding: 4px 10px;
    }

    input[type="text"] {
      font-size: 0.9rem;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;


@property({ type: String }) placeholder = 'Buscar...';
@property({ type: String }) selectedCountry = ''; // Esta propiedad se enlaza con la región seleccionada

onSearch(_event: Event) {
  const inputElement = this.shadowRoot?.querySelector('input');
  if (inputElement) {
    const value = inputElement.value;
    this.dispatchEvent(new CustomEvent('search', {
      detail: value,
      bubbles: true,
      composed: true,
    }));
  }
}



  render() {
    return html`
    <div class="search-container">
    <input
      type="text"
      placeholder="${this.placeholder}"
      @keydown="${(e: KeyboardEvent) => {
        if (e.key === 'Enter') this.onSearch(e);
      }}"
      .value="${this.selectedCountry}"
    />
    <button @click="${this.onSearch}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 2a8 8 0 106.32 13.906l5.385 5.385a1 1 0 101.414-1.414l-5.385-5.385A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
      </svg>
    </button>
  </div>
    `;
  }
}
