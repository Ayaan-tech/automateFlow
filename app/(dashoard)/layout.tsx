import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../(auth)/_components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
      <SidebarInset className="bg-accent/20">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}