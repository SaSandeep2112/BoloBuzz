
import {
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle
} from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CreateWorkspace =()=>{
     const router = useRouter();
    const [open,setOpen]=useCreateWorkspaceModal();
    const [name,setName] = useState("");

    const {mutate,isPending} = useCreateWorkspace();

    const handleClose = ()=>{
        setOpen(false)
        setName("");

        //TODO clear form
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    mutate({
        name
    },{
        OnSuccess(id){
            toast.success("WorkSpace Space Created")
          router.push(`/workspace/${id}`)
          handleClose();
        }
        
    })
    }

    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                    value={name}
                    disabled={isPending}
                    onChange={(e)=>setName(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="WorkSpace name e.g. 'Work', 'Personal,'Home' "/>
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
         
        </Dialog>
    )
}

export default CreateWorkspace;
