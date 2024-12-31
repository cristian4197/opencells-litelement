import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><body></body>`, { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;

// Define CustomEvent globally
global.CustomEvent = dom.window.CustomEvent;