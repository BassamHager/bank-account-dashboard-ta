/*
Purpose: to create a fetching service to get the accounts & return them as a promise
Responsible for the file: (Bassam Hager)
*/

// data
import accounts from "@/data/accounts.json";
// types
import type { IAccounts } from "@/types/typings.d.ts";

export const getAccountsService = (): Promise<IAccounts> => {
  return new Promise((resolve, reject) => {
    resolve(accounts);
    reject("No accounts found!");
  });
};
