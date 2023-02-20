import type { IAccount } from "@/types/typings.d.ts";

export type ShortAccountType = Partial<
  Pick<IAccount, "accountNumber" | "currencyCode" | "balance" | "bookBalance">
>;

export interface ITransaction {
  transactionId: string;
  bookDate: string;
  transactionDateTime: string;
  creditDebitIndicator: "CREDIT" | "DEBIT";
  amount: number;
  counterpartyAccountNumber: string;
  counterpartyName: string;
  description: string;
}

export interface IAccountStatement {
  account: ShortAccountType;
  transactions: ITransaction[];
}
