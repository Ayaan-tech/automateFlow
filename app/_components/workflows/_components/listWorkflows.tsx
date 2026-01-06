'use client'
import React from "react";
import EntityHeader, { EntityPagination, EntitySearch, ErrorView, LoadingView, EmptyView, EntityList, EntityItem } from "../../entity-workflows";
import { EntityContainer } from "../../entity-workflows";
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useCreateWorkflow, useWorkflow. useRemoveWorkflow } from "../hooks/use-workflow";
import { useUpgradeModel } from "../hooks/use-upgrade-model";
import {formatDistanceToNow} from 'date-fns'
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "./use-workflow-params";
import { useWorkflowParams } from "../hooks/use-workflow-params";
import { useEntitysearch } from "../hooks/use-entity-search";
import { Button } from "@/components/ui/button";
import type { Workflow } from "@/src/generated/client";
import { WorkflowIcon } from "lucide-react";

export const workflowsLoading = ()=>{
    return <LoadingView entity="Loading worflows..."/>
}
export const workflowsError = ()=>{
    return <ErrorView entity="Error Loading Workflows...."/>
}
export const workflowItem = ({
    data
}:{data:Workflow}) =>{
    const removeWorkflow = useRemoveWorkflow();
    const handleRemove = ()=>{
        removeWorkflow.mutate({id: data.id});
    }
    return(
        <EntityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
            Updated {formatDistanceToNow(data.updatedAt , {addSuffix:true})}{" "}
            &nbsp; Created{" "}
            {formatDistanceToNow(data.createdAt, {addSuffix:true})}
            </>
        }
        image={
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}/>

    )
}
export const workflowsEmpty = ()=>{
    const router = useRouter()
    const createWorkflow = useCreateWorkflow();
    
    const {handleError, modal}= useUpgradeModel()
    const handleCreate = () =>{
        createWorkflow.mutate(undefined, {
            onError:(error)=>{
                handleError(error)
            },
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
        })
    }
    return (
        <>
        {modal}
        <EmptyView
        onNew={handleCreate}
        message="You haven't created any workflows yet. 
          Get Started by Creating your first workflow"/>
        </>
    )
}
export const workFlowsSearch = () =>{
    const [params, setParams] = useWorkflowParams()
    const {searchValue, onSearchChange} = useEntitysearch({
        params,
        setParams
    })
    return(
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows"/>
    )
}

export const WorkflowsPagination = ()=>{
    const workflows = useWorkflow()
    const [params, setParams] = useWorkflowParams()
    return <EntityPagination
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page)=>setParams({...params, page})}/>
}
export default function ListWorkflows() {
    const workflows =useWorkflow();
    return (
        <EntityList
        items={workflows.data.items}
        getKey={(workflow)=>workflow.id}
        renderItem={(workflow)=><workflowItem data={workflow}/>}
        emptyView={<workflowsEmpty/>}/>
    )
};

export const WorkflowHeader = ({disabled}:{disabled?:boolean} )=>{
    const router = useRouter()
    const {handleError, modal} = useUpgradeModel()
    const createWorkflow = useCreateWorkflow();
    const handleCreate = () =>{
        createWorkflow.mutate(undefined, {
            onSuccess:(data)=>{
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) =>{
                handleError(error)
            }
        })
    }
    return(
        <>
        {modal}
        <EntityHeader
        title="Workflows"
        description="Create an manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}/>
        </>
    )
}

export const WorkflowsContainer = ({
    children
}:{
    children: React.ReactNode
}) =>{
    return(
        <EntityContainer
        header={<WorkflowHeader/>}
        search={<workFlowsSearch/>}
        pagination={<WorkflowsPagination/>}
        >
            {children}
        </EntityContainer>
    )
}
