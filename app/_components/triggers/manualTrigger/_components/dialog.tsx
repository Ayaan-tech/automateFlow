'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";

interface Props{
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}

export const ManualTriggerDialog = ({
    open,
    onOpenChange
}:Props) =>{

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Manual Trigger</DialogTitle>
                <DialogDescription>
                    Configure settings for the manual trigger Node
                </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">Manual Trigger</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}