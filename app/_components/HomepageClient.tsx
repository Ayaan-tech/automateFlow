'use client'

import { Logout } from "../(auth)/_components/LogoutButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const HomepageClient = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getUsers.queryOptions())
  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("AI Task Queued")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))
  const create = useMutation(trpc.creatrWorkFlow.mutationOptions({
    onSuccess: () => {
      toast.success("Job Queued")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))
  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create WorkFlow
      </Button>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Logout />
    </div>
  )
}
