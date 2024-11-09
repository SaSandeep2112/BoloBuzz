import { Button } from "@/components/ui/button"
import {InviteModal} from "./invite-modal"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Doc } from "../../../../convex/_generated/dataModel"
import { ChevronDown, SquarePen } from "lucide-react"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { PerferencesModal } from "./perfences-modal";
import { useState } from "react";

interface WorkspaceHeaderProps{
    workspace:Doc<"workspaces">;
    isAdmin:boolean
}

export const WorkspaceHeader =({workspace,isAdmin}:WorkspaceHeaderProps)=>{
  const [preferencesOpen,setPreferencesOpen]=useState(false);
  const [inviteOpen,setInviteOpen]=useState(false)    
  
  return(
      <>
      <InviteModal open={inviteOpen} setOpen={setInviteOpen} name={workspace.name} joinCode={workspace.joinCode}/>
      <PerferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name}/>
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center ">
                <Button variant="transparent" 
                className="font-semibold text-md w-auto p-1.5 overflow-hidden"
                size="iconSm">
                 <span className="truncate">{workspace.name}</span>
                </Button>
                <ChevronDown 
                className="size-4 ml-1 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
             <DropdownMenuItem
             className="cursor-pointer capitalize">
              <div className="size-9  relative overflow-hidden bg-rose-300 text-white font-semibold text-xl rounded-md flex items-center justify-center  mr-2">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">Active Workspace</p>
              </div>
             </DropdownMenuItem>
             {isAdmin && (
                <>

            <DropdownMenuSeparator/>
             <DropdownMenuItem
             className="cursor-pointer"
             onClick={()=>setInviteOpen(true)}>
                Invite people to {workspace.name}

             </DropdownMenuItem>
             <DropdownMenuItem
             className="cursor-pointer"
             onClick={()=>setPreferencesOpen(true)}>
               Preferences

             </DropdownMenuItem>

            </>
             )}

            </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
            <Button variant="transparent" size="iconSm">
                <SquarePen className="size-4"/>
            </Button>
            <Button variant="transparent" size="iconSm">
                <SquarePen className="size-4"/>
            </Button>
        </div>
       
      </div>
      </>
    )
}