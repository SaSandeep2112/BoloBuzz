import UserButton from "@/features/auth/components/user-button"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { SidebarButton } from "./sidebar-button"
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react"
import { usePathname } from "next/navigation"

export const Sidebar =()=>{

    const pathname = usePathname();
    return(
       <aside className="w-[70px] h-[calc(100vh-40px)] bg-rose-700 flex flex-col gap-y-4 items-center pt-[9px] pb-[10px]">
        <WorkspaceSwitcher/>
        <SidebarButton icon={Home}  label="Home" isActive={pathname.includes("/workspace")}  />
        <SidebarButton icon={MessageSquare}  label="DMs" isActive={true}  />
        <SidebarButton icon={Bell}  label="Activity" isActive={true}  />
        <SidebarButton icon={MoreHorizontal}  label="More" isActive={true}  />
        <div className="flex  items-center gap-y-1 mt-auto justify-end">
        <UserButton/>
        </div>
       </aside>
    )
}