import '@webcomponents/webcomponentsjs/webcomponents-bundle.js'; // Cargar polyfills si es necesario

// Inicializar el DOM
globalThis.customElements = window.customElements;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.customElements.define = window.customElements.define;