'use client'

import { Logout } from "./(auth)/_components/LogoutButton";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Homepage = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.creatrWorkFlow.queryOptions())
  const create = useMutation(trpc.creatrWorkFlow.mutationOptions({
    onSuccess: () =>{
      toast.success("Job Queued")
    },
    onError:(error) =>{
      toast.error(error.message)
    }
  })) 
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <div>{JSON.stringify(data, null , 2)}</div>
      <Button disabled={create.isPending} onClick={()=> create.mutate()}>
        Create WorkFlow
      </Button>
     <Logout/>
    </div>
  )
}
