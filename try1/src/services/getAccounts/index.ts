/*
Purpose: to create a fetching service to get the accounts & return them as a promise
Responsible for the file: (Bassam Hager)
*/

// data
import accountsData from "@/mocks/data/accounts.json";
// types
import type { IAccountGroup } from "@/types/typings";
type Awaitable<T> = T | PromiseLike<T>;

export const getAccountsService = (): Awaitable<IAccountGroup[]> => {
  const accountGroups = accountsData.accountGroups as IAccountGroup[];

  return new Promise((resolve, reject) => {
    resolve(accountGroups);
    reject("No accounts found!");
  });
};
