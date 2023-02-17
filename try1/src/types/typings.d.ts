// types in IAccount
export type IAccountNumberType = "IBAN";
export type AccountProductNameType = "Current Account";
export type CurrencyType = "EUR";
export type BankCountryCodeType = "EUR";

// types in IAccountGroup
export type AccountGroupNameType = "Current Accounts";
export type AccountGroupIdType = "current";

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

export interface IAccounts {
  accountGroups: IAccountGroup[];
}
