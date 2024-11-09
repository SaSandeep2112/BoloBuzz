import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import { Hint } from "./hint";
import { Button } from "./ui/button";

interface ToolbarProps {
    isAuthor: boolean;
    isPending: boolean;
    handleEdit: () => void;
    handleThread: () => void;
    handleDelete: () => void;
    handleReaction: (value: string) => void;
    hdieThreadButton?: boolean;
};

export const Toolbar = ({
    isAuthor,
    isPending,
    handleEdit,
    handleThread,
    handleDelete,
    handleReaction,
    hdieThreadButton,

}: ToolbarProps) =>{
  return (
    <div className="absolute top-0 right-5">
     <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        {/* <EmojiPopover>
        hint = "Add reaction"> */}
     <Button 
   variant="ghost"
   size="iconSm"
   disabled={isPending}>
   <Smile className="size-4"/>
   </Button>
   {/* </EmojiPopover> */}
   <Hint label="Reply in thread">
   <Button 
   variant="ghost"
   size="iconSm"
   disabled={isPending}>
   <MessageSquareTextIcon className="size-4"/>
   </Button>
   </Hint>
   <Hint label="Edit message">
   <Button 
   variant="ghost"
   size="iconSm"
   disabled={isPending}>
   <Pencil className="size-4"/>
   </Button>
   </Hint>
   <Hint label="Delete message
   ">
   <Button 
   variant="ghost"
   size="iconSm"
   disabled={isPending}>
   <Trash className="size-4"/>
   </Button>
   </Hint>

     </div>
    </div>
  )
};