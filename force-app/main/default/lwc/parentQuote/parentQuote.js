import { LightningElement, api, track, wire } from "lwc";
import getQuoteLines from "@salesforce/apex/QuoteController.getQuoteLines";
import getFieldSetFields from "@salesforce/apex/QuoteController.getFieldSetFields";

// Import icons for buttons
import filterIcon from "@salesforce/resourceUrl/filterIcon";
import syncIcon from "@salesforce/resourceUrl/syncIcon";
import sizeIcon from "@salesforce/resourceUrl/sizeIcon";

export default class parentQuote extends LightningElement {
  @api recordId; // The Quote recordId passed from the parent record page
  @track quoteName;

  // Icons stored as class variables
  filterIcon = filterIcon;
  syncIcon = syncIcon;
  sizeIcon = sizeIcon;

  @track tableData = [];
  @track filteredData = []; // Filtered data for the datatable
  @track columns = [];

  searchKey = ""; // Search term for filtering

  // Fetch dynamic fields and data when the component is initialized
  connectedCallback() {
    this.loadFieldSetFields();
    this.loadQuoteLines();
  }

  // Fetch Field Set fields for dynamic columns
  loadFieldSetFields() {
    getFieldSetFields({ fieldSetName: "SBQQ__LineEditor" })
      .then((fieldMap) => {
        this.columns = Object.keys(fieldMap).map((label) => ({
          label: label,
          fieldName: fieldMap[label],
          type: this.getColumnType(fieldMap[label]) // Determine the column type
        }));
      })
      .catch((error) => {
        this.error = error;
      });
  }

  // Fetch Quote Line data based on recordId
  loadQuoteLines() {
    getQuoteLines({
      quoteId: this.recordId,
      fieldSetName: "SBQQ__LineEditor"
    })
      .then((quote) => {
        if (quote[0].SBQQ__Quote__r) {
          this.quoteName = quote[0].SBQQ__Quote__r.Name;
          this.tableData = quote;
          this.filteredData = quote;
        } else {
          this.quoteName = quote[0].Name;
        }

        console.log("quote: ", quote);
      })
      .catch((error) => {
        this.error = error;
      });
  }

  // Utility method to determine column type
  getColumnType(field) {
    if (
      field.toLowerCase().includes("price") ||
      field.toLowerCase().includes("amount")
    ) {
      return "currency";
    } else if (field.toLowerCase().includes("date")) {
      return "date";
    } else if (field.toLowerCase().includes("quantity")) {
      return "number";
    } else {
      return "text";
    }
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
      this.filteredData = [...this.tableData]; // Reset to full data if searchKey is empty
    }
  }
}
