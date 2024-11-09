import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva,type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

const sidebarItemVariants= cva(
    "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] textsm overflow-hidden",
    {
        variants:{
            variant:{
                default:"text-[#f9edffcc]",
                active:"text-black bg-white/90 hover:bg-white/90"
            }
        },
        defaultVariants:{
            variant:"default"
        }
    },
)

interface SidebarItemProps{
    label:string;
    id:string;
    icon:LucideIcon | IconType;
    variant?: VariantProps<typeof sidebarItemVariants>["variant"];
    // id: Id<"channels"> | string;
}

export const SidebarItem =({label,id,icon:Icon,variant}:SidebarItemProps)=>{
      const workspaceId = useworkspaceId();
    return(
        <Button
        variant="transparent"
        size="sm" 
        className={cn(sidebarItemVariants(

            {variant}
        ))}
        asChild>
            <Link href={`/workspace/${workspaceId}/channel/${id}`}>
            <Icon className="size-3.5 mr-1 shrink-0"/>
            <span className="truncate text-sm">{label}</span>

            </Link>
            
        </Button>
    )

}