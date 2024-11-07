import { LightningElement, api, track } from 'lwc';

export default class QuoteTable extends LightningElement {
  @api tableData;
  @api columns;
  @track draftValues = [];

  handleSave(event) {
    // Capture the draft values and trigger the save event for parent component
    this.draftValues = event.detail.draftValues;
    const saveEvent = new CustomEvent('save', { detail: { draftValues: this.draftValues } });
    this.dispatchEvent(saveEvent);
  }
}