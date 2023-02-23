import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import "whatwg-fetch";
// components
import AccountList from "@/components/accounts/AccountList.vue";

/**
 * @jest-environment jsdom
 */
describe("AccountList Component", () => {
  let AccountListWrapper: HTMLElement;

  beforeEach(() => {
    // arrange
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // // act
    render(AccountList, {
      global: {
        plugins: [router],
      },
    });

    AccountListWrapper = screen.getByRole("account-list");
  });

  it("should exist", async () => {
    // assert
    expect.assertions(1);
    expect(AccountListWrapper).toBeDefined();
  });
  it("should have a containing main tag", async () => {
    // assert
    expect.assertions(1);
    expect(AccountListWrapper.tagName).toBe("MAIN");
  });
  it("should have 2 direct children div with the compliant inner elements", () => {
    // assert
    expect.assertions(5);
    const AccountListChildren = AccountListWrapper.children;
    expect(AccountListChildren.length).toBe(2);

    Array.from(AccountListChildren).forEach((group, groupIndex) => {
      expect(group.tagName).toBe("DIV");
      const groupChildren = group.children;
      expect(groupChildren.length).toBe(groupIndex === 0 ? 3 : 2);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
