import {useQueryStates} from "nuqs"
import { workFlowParams } from "../params"

export const useWorkflowParams = () =>{
    return useQueryStates(workFlowParams);
}