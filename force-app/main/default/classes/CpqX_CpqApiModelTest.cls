/**
 * @description Test class for CPQ API Models
 */
@isTest
public class CpqX_CpqApiModelTest {
  /**
   * @description Method to setup test data
   */
  @TestSetup
  static void setupTestData() {
    Account testAccount = CpqX_TestUtils.getTestAccount('CPQX Test Account');
    insert testAccount;

    Opportunity testOpp = CpqX_TestUtils.getTestOpportunity(testAccount.Id, 'CPQX Test Opportunity');
    insert testOpp;
  }

  /**
   * @description Method to test the Quote Calculator API
   */
  @isTest
  static void testQuoteCalculatorAPI() {
    Account acc = [SELECT Id FROM Account LIMIT 1];
    Opportunity opp = [SELECT Id FROM Opportunity LIMIT 1];

    SBQQ__Quote__c qt = CpqX_TestUtils.getTestQuote(acc.Id, opp.Id);
    insert qt;

    String quoteJSON = SBQQ.ServiceRouter.read('SBQQ.QuoteAPI.QuoteReader', qt.Id);
    CpqX_QuoteModel quote = (CpqX_QuoteModel) JSON.deserialize(quoteJSON, CpqX_QuoteModel.class);

    CpqX_QuoteCalculator calcObj = new CpqX_QuoteCalculator();
    calcObj.calculate(quote, 'CpqX_QuoteSaver');

    SBQQ__Quote__c qtToAssert = [SELECT SBQQ__LastCalculatedOn__c FROM SBQQ__Quote__c WHERE Id = :qt.Id LIMIT 1];
    Assert.areNotEqual(null, qtToAssert.SBQQ__LastCalculatedOn__c, 'Quote did not calculate');
  }

  /**
   * @description Method to test Quote Saver API
   */
  @isTest
  static void testQuoteSaverAPI() {
    Account acc = [SELECT Id FROM Account LIMIT 1];
    Opportunity opp = [SELECT Id FROM Opportunity LIMIT 1];

    SBQQ__Quote__c qt = CpqX_TestUtils.getTestQuote(acc.Id, opp.Id);
    insert qt;

    String quoteJSON = SBQQ.ServiceRouter.read('SBQQ.QuoteAPI.QuoteReader', qt.Id);
    CpqX_QuoteModel quote = (CpqX_QuoteModel) JSON.deserialize(quoteJSON, CpqX_QuoteModel.class);

    CpqX_QuoteSaver saverObj = new CpqX_QuoteSaver();
    quote = saverObj.save(quote);

    Assert.areNotEqual(null, quote, 'Quote did not save');
  }
}
