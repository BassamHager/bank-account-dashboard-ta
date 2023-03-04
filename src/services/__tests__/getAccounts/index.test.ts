import { describe, it, expect, vi, afterEach, afterAll } from "vitest";
// mocked data
import accounts from "@/mocks/data/accounts.json";
const mockedAccounts = new Promise((resolve, reject) => {
  resolve(accounts);
  reject("No accounts found!");
});
// services
import * as getAccountsModule from "@/services/getAccounts/index";

// below is: mocking a module in real life example //
/* vi.mock("@/services/getAccounts/index", () => ({
  default: "default",
  getAccountsService: async () => {
    const fetched = await fetch("http://localhost:5173/mocked-accounts");
    const parsed = await fetched.json();
    return parsed;
  },
})); */

describe("getAccountsService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should be callable & it should get the accounts with a spy", async (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    /* act */
    const spy = vi.spyOn(getAccountsModule, "getAccountsService");

    /* assert */
    expect(spy.getMockName()).toEqual("getAccountsService");
    expect(getAccountsModule.getAccountsService()).toEqual(mockedAccounts);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should get with a mock", (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    /* act */
    const mock = vi
      .fn()
      .mockImplementation(getAccountsModule.getAccountsService);

    /* assert */
    expect(mock()).toEqual(mockedAccounts);
    expect(mock).toHaveBeenCalledTimes(1);

    /* act */
    mock.mockImplementationOnce(() => "access-restricted");

    /* assert */
    expect(mock()).toEqual("access-restricted");
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock()).toEqual(mockedAccounts);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  afterAll(() => {
    vi.clearAllMocks;
  });
});
