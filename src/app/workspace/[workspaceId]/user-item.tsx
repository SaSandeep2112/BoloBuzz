import { Button } from "@/components/ui/button"
import { Id } from "../../../../convex/_generated/dataModel"
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const userItemVariants= cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-4 textsm overflow-hidden",
    {
        variants:{
            variant:{
                default:"text-[#f9edffcc]",
                active:"text=[#481349] bg-white/90 hover:bg-white/90"
            }
        },
        defaultVariants:{
            variant:"default"
        }
    },
)

interface UserItemProps{
id:Id<"members">;
label?:string;
image?:string;
variant?:VariantProps<typeof userItemVariants>["variant"];
}

export const UserItem =({
    id,
    label,
    image,
    variant
}:UserItemProps)=>{

    const workspaceId = useworkspaceId();
    const avatarfallback = label?.charAt(0).toUpperCase();
    return(
        <Button
        variant="transparent"
        className={cn(userItemVariants({variant:variant}))}
        size="sm"
        asChild>
            <Link href={`workspace/${workspaceId}/member/${id}`}>
            <Avatar className="size-5 rounded-md mr-1">
             <AvatarFallback className="rounded-md bg-sky-500 text-white">
               {avatarfallback}
             </AvatarFallback >
            </Avatar>
            <span className="text-sm truncate">{label}</span>
            </Link>
              
        
        </Button>
    )
}