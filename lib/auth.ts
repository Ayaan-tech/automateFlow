import {checkout , polar, portal } from '@polar-sh/better-auth'
import {betterAuth} from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma";
import {polarClient} from './polar'
import prisma from "./prisma";

export const auth = betterAuth({
    database:prismaAdapter(prisma, {
        provider:"postgresql",
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:true,
    },
    plugins:[
        polar({
            client:polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "66503389-4be9-4bd7-9f61-82b10760fa69",
                            slug: "pro"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal(),
            ],
        })
    ]
})