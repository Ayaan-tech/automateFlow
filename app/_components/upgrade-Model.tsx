import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Authclient } from "@/lib/auth-client"

interface UpgradeModelProps {
    open:boolean;
    onOpenChange: (open: boolean) => void;
} 

export const UpgradeModel = ({
    open,
    onOpenChange
}: UpgradeModelProps)=>{
    return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to premium</AlertDialogTitle>
                    <AlertDialogDescription>
                        Upgrade to premium to unlock all features
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>Authclient.checkout({slug: "pro"})}>
                        Upgrade Now
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>
    )
}