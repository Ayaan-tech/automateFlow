import { requireAuth } from "@/lib/auth-utils";

interface iAppProps{
    params: Promise<{
        executionId: string;
    }>
}

export default async function Execution({params}:iAppProps){
    await requireAuth();
    const {executionId} = await params;
    return <div>Execution Page for ID: {executionId}</div>
}