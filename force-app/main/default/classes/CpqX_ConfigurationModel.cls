// CPQ Configuration model
public with sharing class CpqX_ConfigurationModel {
  public Id configuredProductId;
  public Id optionId;
  public SBQQ__ProductOption__c optionData; // Editable data about the option in question, such as quantity or discount
  public SBQQ__ProductOption__c configurationData;
  public SBQQ__ProductOption__c inheritedConfigurationData;
  public CpqX_ConfigurationModel[] optionConfigurations;
  public Boolean configured;
  public Boolean changedByProductActions;
  public Boolean isDynamicOption;
  public Boolean isUpgrade;
  public Set<Id> disabledOptionIds;
  public Set<Id> hiddenOptionIds;
  public Decimal listPrice;
  public Boolean priceEditable;
  public String[] validationMessages;
  public String dynamicOptionKey;
}
