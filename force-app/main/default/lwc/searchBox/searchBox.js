import { LightningElement } from 'lwc';

export default class SearchBox extends LightningElement {
  handleSearchChange(event) {
    // Fire custom event with the search key
    const searchKey = event.target.value;
    const searchEvent = new CustomEvent('search', {
      detail: { searchKey }
    });
    this.dispatchEvent(searchEvent);
  }
}
