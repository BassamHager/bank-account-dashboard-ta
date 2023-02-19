import type { IAccount } from "@/types/typings.d.ts";

export type ShortAccountType = Pick<IAccount, "accountNumber" | "currencyCode">;

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
