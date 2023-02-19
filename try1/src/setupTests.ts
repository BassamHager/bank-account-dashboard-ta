import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "@/mocks/server";
import "whatwg-fetch";

// before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// after all tests
afterAll(() => {
  server.close();
});

// after each test
afterEach(() => {
  server.resetHandlers();
});
