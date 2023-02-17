import { describe, it, expect, vi, afterEach } from "vitest";
// mocked data
import accounts from "@/data/accounts.json";
// services
import * as getAccountsModule from "@/services/getAccounts/index";

describe("getAccountsService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockedResponse = new Promise((resolve, reject) => {
    resolve(accounts);
    reject("No accounts found!");
  });

  it("should be callable & it should get the accounts with a spy", async () => {
    const spy = vi.spyOn(getAccountsModule, "getAccountsService");
    expect(spy.getMockName()).toEqual("getAccountsService");

    // as per my humble understanding, the assertion just below is not recommended in real life as it could be quite expensive.
    expect(getAccountsModule.getAccountsService()).toEqual(mockedResponse);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should get with a mock", () => {
    const mock = vi
      .fn()
      .mockImplementation(getAccountsModule.getAccountsService);

    expect(mock()).toEqual(mockedResponse);
    expect(mock).toHaveBeenCalledTimes(1);

    mock.mockImplementationOnce(() => "access-restricted");
    expect(mock()).toEqual("access-restricted");
    expect(mock).toHaveBeenCalledTimes(2);

    expect(mock()).toEqual(mockedResponse);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
