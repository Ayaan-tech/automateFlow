import ListWorkflows, { WorkflowsContainer, workflowsLoading, workflowsError } from "@/app/_components/workflows/_components/listWorkflows";
import { workflowParamsLoader } from "@/app/_components/workflows/params-loader";
import { prefetchWorkFlows } from "@/app/_components/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type iApprops = {
    searchparams: Promise<SearchParams>
}
const WorkflowPage = async({searchparams}: SearchParams) => {
    await requireAuth();
    const params = await workflowParamsLoader(searchparams)
    prefetchWorkFlows(params);
    return (
        <WorkflowsContainer>
            <HydrateClient>
            <ErrorBoundary fallback={<workflowsError/>}>
                <Suspense fallback={<workflowsLoading/>}>
                <ListWorkflows/>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
        </WorkflowsContainer>
    )
}
export default WorkflowPage