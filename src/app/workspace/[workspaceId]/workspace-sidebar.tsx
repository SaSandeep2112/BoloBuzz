import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useworkspaceId } from "@/hooks/use-workspace-id"
import { useChannelId } from "@/hooks/use-channel-id";
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal, SendHorizontal } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channel/api/use-get-Channel";
import { WorkspaceSection } from "./workspace-section";
import { useGetMember } from "@/features/members/api/use-get-members";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/features/channel/store/use-create-channel-modal";

export const WorkspaceSidebar =()=>{

    const workspaceId = useworkspaceId();
    const channelId = useChannelId();
    const [_open,setOpen] = useCreateChannelModal();
    console.log(workspaceId)
    const {data:member,isLoading:memberLoading} = useCurrentMember({workspaceId});
    const {data:workspace,isLoading:workspaceLoading} = useGetWorkspace({id:workspaceId});
    const {data:channels ,isLoading:channelLoading} = useGetChannels({workspaceId});
    const {data:members,isLoading:membersLoading} = useGetMember({workspaceId});
  
    
    if(workspaceLoading || memberLoading){

    return( 
        <div className="flex flex-col bg-rose-600 h-full items-center justify-center">
            <Loader className="size-5 animate-spin text-white"/>
        </div>
    )

   }
      // Show error if either workspace or member data is not available
      if (!workspace || !member) {
        return (  
            <div className="flex flex-col gap-y-2 bg-rose-600 h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white" />
                <p className="text-white text-sm">
                    Workspace Not Found
                </p>
            </div>
        );
    }
   
    return (
        <div className="flex flex-col bg-rose-600 h-full ">
         <WorkspaceHeader workspace={workspace} isAdmin={member.role == "admin"} />
         <div className="flex flex-col px-2 mt-3">
         <SidebarItem
         id="sjdbbd"   
         label="Threads"
         icon={MessageSquareText}
         />
         <SidebarItem
         id="sjdbbd"   
         label="Drafts"
         icon={SendHorizontal}
         />
        </div>

         <WorkspaceSection
         label="Channels"
         hint="New Channel"
         OnNew={member.role ==="admin" ?()=>(setOpen(true)) : undefined}>
         {channels?.map((item)=>(
            <SidebarItem
            key={item._id}
            id={item._id}
            label={item.name}
            icon={HashIcon}
            variant={channelId==item._id ?"active":"default"}/>
         ))}
         </WorkspaceSection>
         <WorkspaceSection
         label="Direct Messages"
         hint="New Direct Messages"
         OnNew={()=>{}}>
         {members?.map((item)=>(
            <UserItem 
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            // variant = {}
            
            />
         ))}

    </WorkspaceSection>
         
      </div>
    )
}