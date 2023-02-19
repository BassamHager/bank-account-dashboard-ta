/*
Purpose: creating a service to get the transactions fetched per account & return them as a promise
Responsibility: Bassam Hager
*/

// types
import type { IAccountStatement } from "@/types/transaction";
type Awaitable<T> = T | PromiseLike<T>;
// constants
import { transactions } from "@/mocks/data/constants";

export const getTransactionsByAccountNumber = ({
  accountNumber,
}: {
  accountNumber: string;
}): Awaitable<IAccountStatement> => {
  const foundTransactions = Object.values(transactions).find(
    (transaction) => transaction.account.accountNumber === accountNumber
  ) as IAccountStatement;

  return new Promise((resolve, reject) => {
    resolve(foundTransactions);
    reject("No transactions found!");
  });
};
