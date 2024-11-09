"use client"

import CreateWorkspace from "@/features/workspaces/components/create-workspace-modal"
import { CreateChannelModal } from "@/features/channel/components/create-channel-modal";
import { useEffect, useState } from "react";
 
export const Modals = ()=>{

    const [mounted,setMounted]= useState(false);

   useEffect(()=>{
    setMounted(true);
   },[]);

   if(!mounted){
    return null;
   }
    return (
        <>
        <CreateWorkspace/>
        <CreateChannelModal/>
        </>
    )
}