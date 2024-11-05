/**
 * @description Utility class for all unit tests
 */
@isTest
public class CpqX_TestUtils {
  static final Id STD_PRICEBOOK_ID = Test.getStandardPricebookId();

  /**
   * @description Method to get an account record for testing
   * @param accountName Name of the account record to be created
   * @return Account record for testing
   */
  public static Account getTestAccount(String accountName) {
    return new Account(Name = accountName);
  }

  /**
   * @description Method to get an opportunity record for testing
   * @param accountId Id of the account record
   * @param opportunityName Name of the opportunity record to be created
   * @return Opportunity record for testing
   */
  public static Opportunity getTestOpportunity(String accountId, String opportunityName) {
    return new Opportunity(
      Name = opportunityName,
      AccountId = accountId,
      StageName = 'Open',
      CloseDate = Date.today(),
      Pricebook2Id = STD_PRICEBOOK_ID
    );
  }

  /**
   * @description Method to get a quote record for testing
   * @param accountId Id of the account record
   * @param opportunityId Id of the opportunity record
   * @return Quote record for testing
   */
  public static SBQQ__Quote__c getTestQuote(String accountId, String opportunityId) {
    return new SBQQ__Quote__c(
      SBQQ__Account__c = accountId,
      SBQQ__Opportunity2__c = opportunityId,
      SBQQ__PricebookId__c = STD_PRICEBOOK_ID,
      SBQQ__StartDate__c = Date.today(),
      SBQQ__SubscriptionTerm__c = 12
    );
  }
}