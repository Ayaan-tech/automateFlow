
import { createTRPCRouter } from '../init';
import prisma from '@/lib/prisma';
import { inngest } from '@/app/api/inngest/client';
import { workflowsRouter } from '@/app/_components/workflows/server/routers';

export const appRouter = createTRPCRouter({
  workflows :workflowsRouter
});

export type AppRouter = typeof appRouter;
 