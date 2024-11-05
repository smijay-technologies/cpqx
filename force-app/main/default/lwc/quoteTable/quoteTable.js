import { LightningElement, api, track } from "lwc";

export default class QuoteTable extends LightningElement {
  @api tableData;
  @api columns;
}
