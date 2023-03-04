import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import "whatwg-fetch";
// components
import AccountDetails from "@/components/accounts/AccountDetails.vue";

/**
 * @jest-environment jsdom
 */
describe("AccountDetails Component", () => {
  let AccountDetailsWrapper: HTMLElement;

  beforeEach(() => {
    // arrange
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // // act
    render(AccountDetails, {
      global: {
        plugins: [router],
      },
    });

    AccountDetailsWrapper = screen.getByRole("account-details");
  });

  it("should exist", async () => {
    // assert
    expect.assertions(1);
    expect(AccountDetailsWrapper).toBeDefined();
  });
  it("should have a containing div tag", async () => {
    // assert
    expect.assertions(1);
    expect(AccountDetailsWrapper.tagName).toBe("DIV");
  });
  it("should have 2 children (div + A)", () => {
    // assert
    expect.assertions(5);
    const AccountDetailsChildren = AccountDetailsWrapper.children;
    expect(AccountDetailsChildren.length).toBe(2);

    Array.from(AccountDetailsChildren).forEach((child, childIndex) => {
      expect(child.tagName).toBe(childIndex === 0 ? "DIV" : "A");

      if (childIndex === 1) {
        expect(child.getAttribute("href")).toBe("/accounts");
        expect(child.textContent).not.toBe("");
      }
    });

    // we can/should elaborate more in a separate describe block for each child with it inner elements & what're the expected attrs : time-dependant
  });

  afterAll(() => {
    cleanup();
  });
});
