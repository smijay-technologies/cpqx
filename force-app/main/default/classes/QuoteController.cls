@SuppressWarnings('PMD.ApexDoc')
public with sharing class QuoteController {
  // Method to get Quote Line Items based on the Quote's recordId
  @AuraEnabled(cacheable=true)
  public static List<SObject> getQuoteLines(String fieldSetName, String quoteId) {
    // Describe the Field Set to get dynamic fields
    Schema.FieldSet fieldSet = Schema.SObjectType.SBQQ__QuoteLine__c.FieldSets.getMap().get(fieldSetName);
    List<String> fields = new List<String>();

    for (Schema.FieldSetMember f : fieldSet.getFields()) {
      fields.add(f.getFieldPath());
    }

    // Build dynamic SOQL to fetch the fields from the field set
    String query =
      'SELECT SBQQ__Quote__r.Name, ' +
      String.join(fields, ',') +
      ' FROM SBQQ__QuoteLine__c WHERE SBQQ__Quote__c = :quoteId';
    List<SBQQ__QuoteLine__c> results = (List<SBQQ__QuoteLine__c>) Database.query(query); // NOPMD

    if (results.size() == 0) {
      String quoteNameQuery = 'SELECT Name FROM SBQQ__Quote__c WHERE Id = :quoteId';
      return Database.query(quoteNameQuery);
    }

    return results;
  }

  // Method to get the Field Set for dynamic columns
  @AuraEnabled(cacheable=true)
  public static Map<String, String> getFieldSetFields(String fieldSetName) {
    Map<String, String> fieldMap = new Map<String, String>();
    Schema.FieldSet fieldSet = Schema.SObjectType.SBQQ__QuoteLine__c.FieldSets.getMap().get(fieldSetName);

    for (Schema.FieldSetMember field : fieldSet.getFields()) {
      // Add the label and the field path to the map
      fieldMap.put(field.getLabel(), field.getFieldPath());
    }

    return fieldMap;
  }
}
