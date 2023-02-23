// types in IAccount
export type IAccountNumberType = "IBAN";
export type AccountProductNameType = "Current Account" | "Savings Account";
export type CurrencyType = "EUR";
export type BankCountryCodeType = "BE";

// types in IAccountGroup
export type AccountGroupNameType = "Current Accounts" | "Savings Accounts";
export type AccountGroupIdType = "current" | "savings";

export interface IAccount {
  accountNumberType: IAccountNumberType;
  accountNumber: string;
  productName: AccountProductNameType;
  currencyCode: CurrencyType;
  holderName: string;
  bankCountryCode: BankCountryCodeType;
  bankIdentifierCode: string;
  balance?: number;
  bookBalance?: number;
}

export interface IAccountGroup {
  groupName: AccountGroupNameType;
  groupId: AccountGroupIdType;
  accounts: IAccount[];
}
