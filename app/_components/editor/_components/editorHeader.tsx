'use client'
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SaveIcon } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input";
import { useEffect, useState,useRef } from "react";
import Link from "next/link";
import { useSuspenseWorkflow, useUpdateWorkflowName } from "../../workflows/hooks/use-workflow";

export const EditorSaveButton = ({workflowId}: {workflowId: string}) => {
    return(
        <div className="ml-auto">
            <Button size={"sm"} onClick={()=>{}} disabled={false}>
                <SaveIcon className="size-4"/>
                Save
            </Button>
        </div>
    )
}
export const EditorNameInput = ({workflowId}:{workflowId: string}) =>{
    const {data: workflow} = useSuspenseWorkflow(workflowId)
    const [editor, setEditor] = useState(false)
    const [name, setName]  = useState(workflow.name)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateWorkflow = useUpdateWorkflowName();

    useEffect(()=>{
        if(workflow.name){
            setName(workflow.name)
        }
    },[workflow.name])
    useEffect(()=>{
        if(editor && inputRef.current){
            inputRef.current.focus();
            inputRef.current.select();
        }
    },[editor])
    const handleSave = () =>{
        if(name=== workflow.name){
            setEditor(false);
            return
        }
        try {
            await updateWorkflow.mutateAsync({
                id:workflowId,
                name,
            });
        } catch (error) {
            setName(workflow.name);
        }finally{
            setEditor(false);
        }
    };
    const handlekeyDown = (e:React.KeyboardEvent)=>{
        if(e.key === "Enter") handleSave;
        else if(e.key =="Escape"){
            setName(workflow.name);
            setEditor(false);
        }
    };
    if(editor){
        return(
            <Input
            disabled={updateWorkflow.isPending}
            ref={inputRef}
            value={name}
            onChange={(e)=>setName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handlekeyDown}
            className="h-7 w-auto min-w-[100px] px-2"/>
        )
    }
    return (
        <BreadcrumbItem onClick={()=>setEditor(true)} className="cursor-pointer hover:text-foreground 
        transition-colors">
            {workflow.name}</BreadcrumbItem>
    )
}
export const EditorBreadCrumbs = ({workflowId}: {workflowId: string}) => {
    return(
        <Breadcrumb>
        <BreadcrumbList>
        <BreadcrumbItem>
        <BreadcrumbLink asChild>
        <Link prefetch href={"/workflows"}>Workflows </Link>
        </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <EditorNameInput workflowId={workflowId}/>
        </BreadcrumbList>
        </Breadcrumb>
    )
}
export const EditorHeader = () => {
    return(
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
                <SidebarTrigger/>
                <div className="flex flex-row items-center justify-between gap-x-4
                h-full">
                    <EditorBreadCrumbs workflowId={workflowId} />
                    <EditorSaveButton workflowId={workflowId} />
                </div>
        </header>
    )
}
