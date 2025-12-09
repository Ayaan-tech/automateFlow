"use client"

import { Button } from "@/components/ui/button"
import { Authclient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const Logout = () => {
    const router = useRouter()
    
    const handleLogout = async () => {
        await Authclient.signOut()
        router.push("/login")
    }
    
    return (
        <Button onClick={handleLogout}>LogOut</Button>
    )
}