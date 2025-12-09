import { email, z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/prisma';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx})=>{
    console.log({userId: ctx.auth.user.id})

    return prisma.workflow.findMany();
  }),
  creatrWorkFlow: protectedProcedure.mutation(()=>{
    await inngest.send({
      name: "test/hello.world",
      data:{
        email: "amjad.quasmi@gmail.com"
      },
    })
    return {success: true , message: "Job Queued"}
  }),
    });
// export type definition of API
export type AppRouter = typeof appRouter;