import { describe, it, expect } from "vitest";
// composables
import { useResize } from "@/composable/useResize.ts";

describe("useResize composable", () => {
  it("should be an importable function", () => {
    expect(typeof useResize).toEqual("function");
  });

  it("should be executable & it should return the expected object", () => {
    const mockedDoc = {
      clientWidth: 100,
      clientHeight: 200,
    };

    console.log(useResize(mockedDoc));
    expect(useResize(mockedDoc)).toEqual({
      width: 100,
      height: 200,
    });
  });
});
