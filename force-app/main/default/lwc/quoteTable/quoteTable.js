import { LightningElement, api } from 'lwc';

export default class QuoteTable extends LightningElement {
  @api tableData;
  @api columns;
}
