import { describe, it, expect, afterAll, vi } from "vitest";
// composables
import { useResize } from "@/composable/useResize";

describe("useResize composable", () => {
  it("should be an importable function", (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    /* assert */
    expect(typeof useResize).toEqual("function");
  });

  it("should be executable & it should return the expected object", (ctx) => {
    /* arrange */
    console.info(ctx.meta.name);

    const mockedDoc = {
      clientWidth: 100,
      clientHeight: 200,
    };

    /* assert */
    expect(useResize({ doc: mockedDoc })).toEqual({
      width: 100,
      height: 200,
    });
  });

  afterAll(() => {
    vi.clearAllMocks;
  });
});
