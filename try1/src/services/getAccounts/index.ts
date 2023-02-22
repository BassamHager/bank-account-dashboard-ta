/*
Purpose of the file: to create a the following functions:
1- getAccountsService:
  fetching service to get the group of accounts & to return them as a promise
2- getAccountBalance: 
  calls the previous function with a param(string) to return the balance of a correspondent account
Responsible for the file: (Bassam Hager)
*/

// data
import accountsData from "@/mocks/data/accounts.json";
// types
import type { IAccountGroup } from "@/types/typings";
type Awaitable<T> = T | PromiseLike<T>;

export const getAccountsService = (): Awaitable<IAccountGroup[]> => {
  const accountGroups = accountsData.accountGroups as IAccountGroup[];

  try {
    return new Promise((resolve, reject) => {
      resolve(accountGroups);
      reject("No accounts found!");
    });
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export const getAccountBalance = async ({
  accountNumber,
}: {
  accountNumber: string;
}) => {
  let balance;

  const groups = await getAccountsService();
  groups.forEach((group) =>
    group.accounts.forEach((account) => {
      if (account.accountNumber === accountNumber)
        balance = account.balance ? account.balance : account.bookBalance;
    })
  );

  return balance;
};
