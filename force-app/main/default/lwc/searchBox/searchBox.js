import { LightningElement } from 'lwc';

export default class SearchBox extends LightningElement {
  handleSearchChange(event) {
    // Fire custom event with the search key
    const search = event.target.value,
      searchEvent = new CustomEvent('search', {
        detail: { search }
      });
    this.dispatchEvent(searchEvent);
  }
}