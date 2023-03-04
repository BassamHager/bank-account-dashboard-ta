import { describe, it, expect, afterEach, afterAll, vi } from "vitest";
// data
import { transactions } from "@/mocks/data/constants";
// services
import * as getTransactionsModule from "@/services/getTransactions/index";
// types
import type { IAccountStatement } from "@/types/transaction";
type Awaitable<T> = T | PromiseLike<T>;
// mocked data
const mockedTransactionStatement =
  transactions.transactionsB as IAccountStatement;
const mockedAccountNumber: string =
  transactions.transactionsB.account.accountNumber;
const mockedResponse: Awaitable<IAccountStatement> = new Promise(
  (resolve, reject) => {
    resolve(mockedTransactionStatement);
    reject("No transactions found!");
  }
);

describe("getTransactionsByAccountNumber", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const getTransactionsByAccountNumber = () =>
    getTransactionsModule.getTransactionsByAccountNumber({
      accountNumber: mockedAccountNumber,
    });

  it("should be callable & it should get the accounts with a spy", async (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    /* act */
    const spy = vi.spyOn(
      getTransactionsModule,
      "getTransactionsByAccountNumber"
    );

    /* assert */
    expect(spy.getMockName()).toEqual("getTransactionsByAccountNumber");

    expect(getTransactionsByAccountNumber()).toEqual(mockedResponse);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should get with a mock", (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    /* act */
    const mock = vi.fn().mockImplementation(getTransactionsByAccountNumber);

    /* assert */
    expect(mock()).toEqual(mockedResponse);
    expect(mock).toHaveBeenCalledTimes(1);

    /* act */
    mock.mockImplementationOnce(() => "access-restricted");

    /* assert */
    expect(mock()).toEqual("access-restricted");
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock()).toEqual(mockedResponse);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  afterAll(() => {
    vi.clearAllMocks;
  });
});
