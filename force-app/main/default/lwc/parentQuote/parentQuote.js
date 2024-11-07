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
  // Filtered data for the search
  @track filteredData = [];
  @track columns = [];
  @track draftValues = [];

  // Search term for filtering
  searchKey = '';
  error = '';
  // Fetch dynamic fields and data when the component is initialized
  connectedCallback() {
    this.loadFieldSetFields();
    this.loadQuoteLines();
  }

  // Fetch Field Set fields for dynamic columns
  loadFieldSetFields() {
    getFieldSetFields({ fieldSetName: 'SBQQ__LineEditor' })
      .then((fieldMap) => {
        this.columns = Object.keys(fieldMap).map((label) => {
          const fieldInfo = fieldMap[label];
          return {
            editable: true,
            fieldName: fieldInfo.apiName,
            label,
            type: ParentQuote.getColumnType(fieldInfo.type)
          };
        });
      })
      .catch((error) => {
        this.error = error;
        //Console.error(error);
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
        //Console.error(error);
      });
  }

  // Utility method to determine column type
  static getColumnType(fieldType) {
    switch (fieldType.toLowerCase()) {
      case 'currency':
        return 'currency';
      case 'date':
        return 'date';
      case 'double':
      case 'integer':
        return 'number';
      default:
        return 'text';
    }
  }
  // Handle search event from child component
  handleSearch(event) {
    this.searchKey = event.detail.search.toLowerCase();
    this.filterQuoteLines();
  }

  // Filter quote lines based on the search key
  filterQuoteLines() {
    if (this.searchKey) {
      this.filteredData = this.tableData.filter((row) =>
        Object.keys(row).some((field) => {
          let fieldValue = '';
          if (row[field]) {
            fieldValue = String(row[field]).toLowerCase();
          }
          return fieldValue.includes(this.searchKey);
        })
      );
    } else {
      this.filteredData = [...this.tableData];
    }
  }
}
