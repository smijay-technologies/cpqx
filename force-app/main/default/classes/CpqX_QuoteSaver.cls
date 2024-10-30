/**
 * @description CPQ API QuoteSaver class
 */
@SuppressWarnings('PMD.AvoidGlobalModifier')
global with sharing class CpqX_QuoteSaver implements SBQQ.CalculateCallback {
  /**
   * @description Method to save the quote from the quote model
   * @param quote QuoteModel to be saved
   * @return Saved version of the Quote record as a QuoteModel
   */
  public CpqX_QuoteModel save(CpqX_QuoteModel quote) {
    String quoteJSON = SBQQ.ServiceRouter.save('SBQQ.QuoteAPI.QuoteSaver', JSON.serialize(quote));
    return (CpqX_QuoteModel) JSON.deserialize(quoteJSON, CpqX_QuoteModel.class);
  }

  /**
   * @description Callback method for quote calculation async service
   * @param quoteJSON JSON string containing the QuoteModel information
   */
  global void callback(String quoteJSON) {
    SBQQ.ServiceRouter.save('SBQQ.QuoteAPI.QuoteSaver', quoteJSON);
  }
}
