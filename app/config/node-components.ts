import { initialNode } from "@/components/intial-node";
import {NodeType} from "@/src/generated"
import { NodeTypes } from "@xyflow/react"
import { HttpRequestNode } from "../_components/nodes/httpRequest/_components/node";
import { ManualTriggerNode } from "../_components/triggers/manualTrigger/_components/node";

export const nodeComponents = {
    [NodeType.INITIAL]: initialNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
    [NodeType.MANUAL_TRIGGER]: ManualTriggerNode
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents