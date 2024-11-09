import { Button } from "@/components/ui/button";
import {
    Dialog,DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PerferencesModalProps{
    open:boolean;
    setOpen:(open:boolean)=>void;
    initialValue:string;
}
export const PerferencesModal =({open , setOpen,initialValue}:PerferencesModalProps)=>{
    const router = useRouter();
   const workspaceId = useworkspaceId();
   const [ConfirmDialog,confirm] = useConfirm(
    "Are you Sure",
    "This action is irreversible"
   );
    const [value,setValue]=useState(initialValue);
  const [editOpen,setEditOpen] = useState(false);
 const  {mutate:updateWorkspace, isPending:isUpdatingWorkspace}= useUpdateWorkspace();
 const  {mutate:removeWorkspace, isPending:isRemoveWorkspace}= useRemoveWorkspace();

const handleEdit = (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

  updateWorkspace({
    id:workspaceId,
    name:value,
  },
{
    OnSuccess:()=>{
        toast.success(
            "Updated Successfully"
        );
        setEditOpen(false)
      },OnError:()=>{
        toast.error("Failed to Update workspace ")
      }
})

  

}

const handleRemove =async()=>{
    const ok = await confirm();
    if(!ok) return
    removeWorkspace({
        id:workspaceId
    },{
        OnSuccess:()=>{
            toast.success("Deleted Successfully")
            router.replace("/")
        },
        OnError:()=>{
            toast.error("Not able to delete  workspac")
        }
    })
}


    return (
        <>
        <ConfirmDialog/>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
                <DialogTitle>
                    {value}
                </DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">

                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>

               
               <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                 <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                        Works
                    </p>   
                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Edit
                    </p>   
                 </div>
                 <p className="text-sm">
                    {value}
                 </p>
               </div>
               </DialogTrigger>
               <DialogContent>
                <DialogHeader>Rename this workspace</DialogHeader>
                <form  className="space-y-4" onSubmit={handleEdit}>
                    <Input 
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e)=>setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g 'Work' ,'personal'"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isUpdatingWorkspace}>
                            Cancel 
                            </Button>
                        </DialogClose>
                        <Button disabled={isUpdatingWorkspace}>Save</Button>
                    </DialogFooter>
                </form>
               </DialogContent>
               </Dialog>
               <button
               disabled={isRemoveWorkspace}
               onClick={handleRemove}
               className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer hover:bg-grap-50 text-rose-600">
               <TrashIcon/>
               <p className="text-sm font-semibold">Delete Workspace</p>
               </button>
            </div>
        </DialogContent>
    </Dialog>
    </>
)
}