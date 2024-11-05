import { LightningElement } from 'lwc';

export default class SearchBox extends LightningElement {
  handleSearchChange(event) {
    // Fire custom event with the search key
    const searchKey = event.target.value,
      searchEvent = new CustomEvent('search', {
        detail: { searchKey }
      });

    // Dispatch the custom event
    this.dispatchEvent(searchEvent);
  }
}
