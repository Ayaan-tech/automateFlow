'use client'

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {useHasActiveSubscription , useSubscription} from "@/app/_components/payments/hooks/use-subscription"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Authclient } from "@/lib/auth-client"

// Define the menu structure
const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows", // Changed title to match context (optional)
        icon: FolderOpenIcon,
        url: "/workflows",
      },
    ],
  },
  {
    title: "Executions",
    items: [
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
  {
    title: "Credentials",
    items: [
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
    ],
  },
]

export const AppSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const {hasActiveSubscription, isLoading} = useHasActiveSubscription();
  const handleSignOut = () => {
    Authclient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
      },
    })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
              <Link href={"/workflows"} prefetch>
                <Image
                  src={"/logo-bg.svg"}
                  alt="AutomateFlow"
                  width={30}
                  height={30}
                />
                <span className="font-semibold text-sm">AutomateFlow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname?.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* Upgrade Button */}
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Upgrade to Pro"
              className="gap-x-4 h-10 px-4"
              onClick={() =>Authclient.checkout({ slug: "pro" })}
            >
              <StarIcon className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          )}

          {/* Billing Button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() =>Authclient.customer.billingPortal()}
            >
              <CreditCardIcon className="h-4 w-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Sign Out Button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-4"
              onClick={handleSignOut}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}