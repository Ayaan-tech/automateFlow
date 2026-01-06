import { TRPCClientError } from "@trpc/client";
import { useState } from "react";
import { UpgradeModel } from "../../upgrade-Model";

export const useUpgradeModel = () =>{
    const [open, setOpen] = useState(false);
    const handleError = (error: TRPCClientError) =>{
        if(error instanceof TRPCClientError){
            if(error.data?.code === "FORBIDDEN"){
            setOpen(true)
            return true
        }
        }
        return false
    };
    const modal = <UpgradeModel open={open} onOpenChange={setOpen} />;
    return {handleError, modal}
};