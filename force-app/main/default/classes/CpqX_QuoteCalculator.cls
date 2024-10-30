/**
 * @description CPQ API Quote Calculator Class
 */
public with sharing class CpqX_QuoteCalculator {
  /**
   * @description Method to calculate the quote record
   * @param quote Quote Model class for calculation
   * @param callbackClass Class name for the callback service
   */
  public void calculate(CpqX_QuoteModel quote, String callbackClass) {
    QuoteCalculatorContext ctx = new QuoteCalculatorContext(quote, callbackClass);
    SBQQ.ServiceRouter.load('SBQQ.QuoteAPI.QuoteCalculator', null, JSON.serialize(ctx));
  }

  /**
   * @description Inner class for quote calculation service
   */
  private class QuoteCalculatorContext {
    private CpqX_QuoteModel quote;
    private String callbackClass;

    /**
     * @description Constructor method to initialize quote calculator context
     * @param quote Quote Model class for calculation
     * @param callbackClass Class name for the callback service
     */
    private QuoteCalculatorContext(CpqX_QuoteModel quote, String callbackClass) {
      this.quote = quote;
      this.callbackClass = callbackClass;
    }
  }
}
