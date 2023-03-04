import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import "whatwg-fetch";
// components
import AccountActions from "@/components/accounts/AccountActions.vue";

/**
 * @jest-environment jsdom
 */
describe("AccountActions Component", () => {
  let AccountActionsWrapper: HTMLElement;

  beforeEach(() => {
    // arrange
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // act
    render(AccountActions, {
      global: {
        plugins: [router],
      },
    });

    AccountActionsWrapper = screen.getByRole("account-actions");
  });

  it("should exist", async () => {
    // assert
    expect.assertions(1);
    expect(AccountActionsWrapper).toBeDefined();
  });
  it("should have a containing div tag", async () => {
    // assert
    expect.assertions(1);
    expect(AccountActionsWrapper.tagName).toBe("DIV");
  });
  it("should have 3 children of Input component each has a specific type", () => {
    // assert
    expect.assertions(4);
    const accountActionsChildren = AccountActionsWrapper.children;
    expect(accountActionsChildren.length).toBe(3);

    // assert it has 3 inputs ('search','from','to') respectively
    Array.from(accountActionsChildren).forEach((child, childIndex) => {
      const childInputType = child.children[1].getAttribute("type");
      expect(childInputType).toBe(childIndex === 0 ? "text" : "date");
    });
  });

  afterAll(() => {
    cleanup();
  });
});
