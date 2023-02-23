import { vi, describe, it, expect, beforeEach, afterAll } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/vue";
import { routes } from "@/router/index";
import { createRouter, createWebHistory } from "vue-router";
import "whatwg-fetch";
// components
import Input from "@/components/UI/Input.vue";

/**
 * @jest-environment jsdom
 */
describe("Input Component", () => {
  let InputWrapper: HTMLElement;

  beforeEach(() => {
    // arrange
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    // // act
    render(Input, {
      global: {
        plugins: [router],
      },
    });

    InputWrapper = screen.getByRole("custom-input");
  });

  it("should exist", async () => {
    // assert
    expect.assertions(1);
    expect(InputWrapper).toBeDefined();
  });
  it("should have a containing div tag", async () => {
    // assert
    expect.assertions(1);
    expect(InputWrapper.tagName).toBe("DIV");
  });
  it("should have 2 direct children (label + input)" /* NOTE: the button is not shown as expected */, () => {
    // assert
    // expect.assertions(5);
    const InputChildren = InputWrapper.children;
    expect(InputChildren.length).toBe(2);

    Array.from(InputChildren).forEach((child, childIndex) => {
      expect(child.tagName).toBe(childIndex === 0 ? "LABEL" : "INPUT");

      if (childIndex === 0) {
        expect(child.textContent).toBe("");
      }
    });

    // we can/should elaborate more in a separate describe block for each child with it inner elements & what're the expected attrs : time-dependant
  });

  it("should have 3 direct children (label + input + button) if an input made", async () => {
    // assert
    // expect.assertions(5);
    const InputChildren = InputWrapper.children;
    expect(InputChildren.length).toBe(2);

    const input = InputChildren[1];
    input.setAttribute("type", "search");
    // @TODO: fireEvent update value
    // @TODO: assert the existence of the clearing button
  });

  afterAll(() => {
    cleanup();
  });
});
