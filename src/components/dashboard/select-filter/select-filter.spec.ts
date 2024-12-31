import { fixture, html } from '@open-wc/testing';
import './select-filter.ts';

describe('SelectFilter', () => {
  it('renders the select element with options', async () => {
    const el = await fixture(html`
      <select-filter
        .selectOptions="${[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}"
        labelForSelection="Select an option"
        selectedRegion=""
      ></select-filter>
    `);

    const select = el.shadowRoot?.querySelector('select');
    expect(select).not.toBeNull();
    expect(select?.options.length).toBe(3); // Including the default "Seleccione Valor" option
  });

  it('dispatches an event when an option is selected', async () => {
    const el = await fixture(html`
      <select-filter
        .selectOptions="${[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]}"
        labelForSelection="Select an option"
        selectedRegion=""
      ></select-filter>
    `);

    const select = el.shadowRoot?.querySelector('select');
    let eventDetail: any = null;
    el.addEventListener('option-selected', (event: Event) => {
      eventDetail = (event as CustomEvent).detail;
    });

    select!.value = 'option1';
    select!.dispatchEvent(new CustomEvent('change', { bubbles: true, cancelable: true }));

    expect(eventDetail).toEqual({ value: 'option1', label: 'Option 1' });
  });
});