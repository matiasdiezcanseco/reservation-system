import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { flights, seats } from "../../db/mock-data";

export const flightsRouter = createTRPCRouter({
  getFlights: publicProcedure.input(z.any()).query(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return flights;
  }),

  getFlightDataById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return {
        seats: seats.filter((seat) => seat.flightId === input.id),
      };
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),
});
