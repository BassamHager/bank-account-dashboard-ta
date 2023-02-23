// src/mocks/handlers.js
import { rest } from "msw";
// data
import accountsData from "@/mocks/data/accounts.json";

export const handlers = [
  rest.get("/accounts", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(accountsData));
  }),
];
