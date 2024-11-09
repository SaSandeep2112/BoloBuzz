import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon, RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
    open:boolean;
    setOpen:(opean:boolean)=>void;
    name:string;
    joinCode:string
    
}


export const InviteModal = ({open,setOpen,name,joinCode}:InviteModalProps)=>{
     
    const workspaceId = useworkspaceId();
    const {mutate ,isPending} = useNewJoinCode(); 
    const [ConfirmDialog,confirm] = useConfirm("Are you sure?","This will deactivate the current and generate a new one")
    
    const handleNewCode = async()=>{
       const ok = await confirm();
      
       if(!ok) return;

        mutate({workspaceId},{
            OnSuccess:()=>{
                toast.success("Invite code regenrated")
            },
            OnError:()=>{
                toast.error("faiuled to regenrate invite code")
            }
        });
    }
    
    const handleCopy = ()=>{
        const inviteLink = `${window.location.origin}/join/${workspaceId}`
        navigator.clipboard.writeText(inviteLink)
                                  .then(()=>toast.success("Invite Link copied Successfully"))
    }

    return (
        <>
        <ConfirmDialog/>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
                <DialogTitle>
                    Invite People to {name}
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Use the below code to invite people to your workspace
            </DialogDescription>
            <div className="flex flex-col gap-y-4 items-center justify-center py-10">
               <p className="text-4xl font-bold tracking-widest uppercase">
               {joinCode}
               </p>
               <Button 
               variant="transparent"
               className="text-black "
               size="sm"
               onClick={handleCopy}
               >
                <CopyIcon /> Copy link 
               </Button>
            </div>
            <div className="flex items-center justify-between w-full p-4">
                <Button
                disabled={isPending}
                variant="ghost"
                className="flex items-center justify-center gap-x-2" 
               onClick={handleNewCode}
                >
                    New Code
                    <RefreshCwIcon className="size-4"/>
                </Button>
                <DialogClose>
                    <Button
                    variant="ghost">Close</Button>
                </DialogClose>

            </div>
        </DialogContent>
    </Dialog>
    </>
    )
}