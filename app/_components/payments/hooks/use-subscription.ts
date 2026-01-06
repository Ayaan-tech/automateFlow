import { useQuery } from "@tanstack/react-query";
import { Authclient } from "@/lib/auth-client";


export const useSubscription = () => {
    return useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const {data} = await Authclient.customer.state()
            return data
        }
    })
}
export const useHasActiveSubscription =() =>{
    const {data:customerState,  isLoading, ...rest} = useSubscription();
    const hasActiveSubscription = customerState?.subscriptions && customerState?.subscriptions?.length > 0
    return {
        hasActiveSubscription,
        subscription: customerState?.subscriptions?.[0] || null,
        isLoading,
        ...rest
    }

}