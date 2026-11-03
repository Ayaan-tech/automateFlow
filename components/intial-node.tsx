'use client'

import type { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./workflow-nodes"
import { NodeSelector } from "./node-selector"

export const initialNode = memo((props: NodeProps) =>{
    const [selectorOpen, setSelectorOpen] = useState(false)
    return(
       <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
         <WorkflowNode name="Initial Node" description="Add your first Node">
            <PlaceholderNode
            {...props}
            onClick={()=>setSelectorOpen(true)}
            >
                <div className="cursor-pointer flex items-center justify-center">
                    <PlusIcon className="w-5 h-5 text-gray-400" />
                </div>
        </PlaceholderNode>
        </WorkflowNode>
       </NodeSelector>
    )
})