import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  afterAll,
  afterEach,
} from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import "whatwg-fetch";
// components
import AppHeader from "@/components/AppHeader.vue";

/**
 * @jest-environment jsdom
 */
describe("AppHeader Component", () => {
  let AppHeaderWrapper: HTMLElement;

  beforeEach(() => {
    // arrange
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // act
    render(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    AppHeaderWrapper = screen.getByRole("app-header");
  });

  it("should exist", async () => {
    // assert
    expect.assertions(1);
    expect(AppHeaderWrapper).toBeDefined();
  });
  it("should have a header tag", async () => {
    // assert
    expect.assertions(1);
    expect(AppHeaderWrapper.tagName).toBe("HEADER");
  });
  it("should have a child component anchor with a specified href attribute", () => {
    // assert
    expect.assertions(3);
    const headerChildren = AppHeaderWrapper.children;
    expect(headerChildren.length).toBe(1);
    const headerLink = headerChildren[0];
    expect(headerLink.tagName).toBe("A");
    expect(headerLink.getAttribute("href")).toBe("/accounts");
  });

  it("should have a text-content for the header", () => {
    // assert
    expect.assertions(1);
    // I've read that it's not recommended to have the text-context written in the test explicitly to avoid slow down the potential changing process,
    // unless of course it's an important text
    expect(AppHeaderWrapper.textContent).not.toBe("");
  });

  afterAll(() => {
    cleanup();
  });
});
