'use client'
import { Button } from "@/components/ui/button"
import { Authclient } from "@/lib/auth-client"


export const Logout = async() =>{
    return(
        <Button onClick={() => Authclient.signOut()}>LogOut </Button>
    )
}