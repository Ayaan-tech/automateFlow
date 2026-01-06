import {requireAuth } from "@/lib/auth-utils"; 
import ListWorkflows, { WorkflowsContainer, workflowsLoading, workflowsError } from "@/app/_components/workflows/_components/listWorkflows";
import { workflowParamsLoader } from "@/app/_components/workflows/params-loader";
import { prefetchWorkFlows } from "@/app/_components/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorHeader } from "@/app/_components/editor/_components/editorHeader";
import { Editor, EditorError, EditorLoading } from "@/app/_components/editor/_components/editor";
interface iAppProps{
    params: Promise<{
        workflowId: string;
    }>
}

export default async function Workflow({params}:iAppProps){
    await requireAuth();
    const {workflowId} = await params;
    return(
        <HydrateClient>
                    <ErrorBoundary fallback={<EditorLoading/>}>
                        <Suspense fallback={<EditorError/>}>
                        <EditorHeader workflowId={workflowId}/>
                        <main className="flex-1">
                            <Editor workflowId={workflowId}/>
                        </main>
                        <ListWorkflows/>
                        </Suspense>
                    </ErrorBoundary>
                </HydrateClient>
    )
}