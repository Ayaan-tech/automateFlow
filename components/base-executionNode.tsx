'use client'
import { type NodeProps, Position, useReactFlow } from "@xyflow/react"
import { memo, useCallback, type ReactNode } from "react"
import Image from "next/image"
import { Icon, type LucideIcon } from "lucide-react"
import { BaseNode, BaseNodeContent } from "./base-node"
import { BaseHandle } from "./base-handle"
import { WorkflowNode } from "./workflow-nodes"
import { onSet } from "better-auth/react"
import { NodeStatusIndicator, type NodeStatus } from "./node-status-indicator"

interface BaseExecutionNodeProps extends NodeProps {
    icon: LucideIcon | string;
    name: string;
    description? :string;
    status?:NodeStatus;
    children?: ReactNode;
    onSettings?: ()=> void;
    onDoubleClick?: ()=> void;
}

export const BaseExecutionNode = memo(({
    id,
    icon: Icon,
    name,
    status="initial",
    description,
    children,
    onSettings,
    onDoubleClick
}: BaseExecutionNodeProps)=>{
    const {setNodes, setEdges} = useReactFlow()
    const handleDelete= () =>{
        setNodes((currentNode)=>{
            const updatedNodes= currentNode.filter((node)=>node.id !== id);
            return updatedNodes;
        });
        setEdges((currentEdge)=>{
            const updatedEdges = currentEdge.filter((edge)=>edge.source !== id && edge.target !== id);
            return updatedEdges;
        })
    };
    return(
        <WorkflowNode
            name={name}
            description={description}
            onDelete={handleDelete}
            onSettings={onSettings}>
           <NodeStatusIndicator 
            status={status}
            variant="border"
           >
                 <BaseNode status={status} onDoubleClick={onDoubleClick}>
                    <BaseNodeContent>
                    {typeof Icon === "string" ? (
                        <Image src={Icon} alt={name} width={16} height={16}/>
                    ):(
                        <Icon className="size-4 text-muted-foreground"/>
                    )}
                    {children}
                    <BaseHandle
                        id={"target-1"}
                        type="source-1"
                        position={Position.Left}/>
                    <BaseHandle
                        id={"target-1"}
                        type="source-1"
                        position={Position.Right}/>
                    </BaseNodeContent>
                </BaseNode>
           </NodeStatusIndicator>
            </WorkflowNode>
    )
})

BaseExecutionNode.displayName = "BaseExecutionNode"