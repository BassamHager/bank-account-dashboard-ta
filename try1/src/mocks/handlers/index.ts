// src/mocks/handlers.js
import { rest } from "msw";
// data
import accounts from "@/mocks/data/accounts.json";

export const handlers = [
  rest.get("http://localhost:5173/mocked-accounts", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(accounts));
  }),
];
