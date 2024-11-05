import { LightningElement, api, track } from 'lwc';
import filterIcon from '@salesforce/resourceUrl/filterIcon';
import getFieldSetFields from '@salesforce/apex/QuoteController.getFieldSetFields';
import getQuoteLines from '@salesforce/apex/QuoteController.getQuoteLines';
import sizeIcon from '@salesforce/resourceUrl/sizeIcon';
import syncIcon from '@salesforce/resourceUrl/syncIcon';

export default class ParentQuote extends LightningElement {
  // The Quote recordId passed from the parent record page
  @api recordId;
  @track quoteName;

  defaultType = 'text';
  // Icons stored as class variables
  filterIcon = filterIcon;
  syncIcon = syncIcon;
  sizeIcon = sizeIcon;

  @track tableData = [];
  // Filtered data for the datatable
  @track filteredData = [];
  @track columns = [];

  // Search term for filtering
  searchKey = '';

  // Fetch dynamic fields and data when the component is initialized
  connectedCallback() {
    this.loadFieldSetFields();
    this.loadQuoteLines();
  }

  // Fetch Field Set fields for dynamic columns
  loadFieldSetFields() {
    getFieldSetFields({ fieldSetName: 'SBQQ__LineEditor' })
      .then((fieldMap) => {
        this.columns = Object.keys(fieldMap).map((label) => ({
          fieldName: fieldMap[label],
          label,
          type: this.getColumnType(fieldMap[label])
        }));
      })
      .catch((error) => {
        this.error = error;
      });
  }

  // Fetch Quote Line data based on recordId
  loadQuoteLines() {
    const FIRST_ELEMENT_INDEX = 0;
    getQuoteLines({
      fieldSetName: 'SBQQ__LineEditor',
      quoteId: this.recordId
    })
      .then((quote) => {
        if (quote[FIRST_ELEMENT_INDEX].SBQQ__Quote__r) {
          this.quoteName = quote[FIRST_ELEMENT_INDEX].SBQQ__Quote__r.Name;
          this.tableData = quote;
          this.filteredData = quote;
        } else {
          this.quoteName = quote[FIRST_ELEMENT_INDEX].Name;
        }
      })
      .catch((error) => {
        this.error = error;
      });
  }

  // Utility method to determine column type
  getColumnType(field) {
    if (field.toLowerCase().includes('price') || field.toLowerCase().includes('amount')) {
      return 'currency';
    } else if (field.toLowerCase().includes('date')) {
      return 'date';
    } else if (field.toLowerCase().includes('quantity')) {
      return 'number';
    }
    return this.defaultType;
  }

  // Handle search event from child component
  handleSearch(event) {
    this.searchKey = event.detail.searchKey.toLowerCase();
    this.filterQuoteLines();
  }

  // Filter quote lines based on the search key
  filterQuoteLines() {
    if (this.searchKey) {
      this.filteredData = this.tableData.filter((row) =>
        row.SBQQ__ProductName__c.toLowerCase().includes(this.searchKey)
      );
    } else {
      // Reset to full data if searchKey is empty
      this.filteredData = [...this.tableData];
    }
  }
}
