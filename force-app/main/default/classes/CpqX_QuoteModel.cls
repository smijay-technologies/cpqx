public with sharing class CpqX_QuoteModel {
  public SBQQ__Quote__c record;
  public CpqX_QuoteLineModel[] lineItems;
  public CpqX_QuoteLineGroupModel[] lineItemGroups;
  public Integer nextKey;
  public Boolean applyAdditionalDiscountLast;
  public Boolean applyPartnerDiscountFirst;
  public Boolean channelDiscountsOffList;
  public Decimal customerTotal;
  public Decimal netTotal;
  public Decimal netNonSegmentTotal;
}
