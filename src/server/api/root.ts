import { createTRPCRouter } from "~/server/api/trpc";
import { flightsRouter } from "./routers/flight";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  flights: flightsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
