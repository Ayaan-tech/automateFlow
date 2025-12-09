"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"
import {Button} from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Authclient } from "@/lib/auth-client"

const loginSchema = z.object({
    email: z.string().email("Please enter a valid Email"),
    password: z.string().min(1, "Password is required")
})
type LoginFormValues = z.infer<typeof loginSchema>

export default function Login(){
    const router = useRouter()
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        },
    });
    const onSubmit = async(values: LoginFormValues) =>{
        await Authclient.signIn.email({
            email:values.email,
            password:values.password,
            callbackURL:'/',
        },{
            onSuccess:()=>{
                router.push('/')
            },
            onError:(cts) =>{
                toast.error(cts.error.message)
            }
        })
    }
    const isPending = form.formState.isSubmitting

    return(
        <div className="flex flex-col gap-6">
              <Card>
                <CardHeader className="text-center">
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Login to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    
                                    <Button className="w-full" variant={"outline"} type="button" disabled={isPending}>
                                        <Image alt="Github" src={"/github.svg"} width={20} height={20}/>
                                        Continue with Github
                                    </Button>
                                    <Button className="w-full" variant={"outline"} type="button" disabled={isPending}>
                                        <Image alt="Google" src={"/google.svg"} width={20} height={20}/>
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="email"
                                                placeholder="amjad.quasmi@gmail.com"
                                                {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/> 
                                    <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({field}) =>(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/> 
                                    <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isPending}>
                                        Login
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link href={"/register"} className="underline underline-offset-4">Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                </Card>  
        </div>
    )
}