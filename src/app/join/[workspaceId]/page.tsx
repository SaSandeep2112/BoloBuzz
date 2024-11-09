"use client"

import Image from "next/image"
import image from "../../../../public/vercel.svg"
import VerificationInput from "react-verification-input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useworkspaceId } from "@/hooks/use-workspace-id"
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info"
import { Loader } from "lucide-react"
import { useJoin } from "@/features/workspaces/api/use-join"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useMemo } from "react"

// interface JoinPageProps {
//     params:{
//         workspaceId:string
//     }
// } 
//This is Generate the same result as My hooks
const  JoinPage = ()=>{
   const router = useRouter();
    const workspaceId = useworkspaceId();
    const {data,isLoading}= useGetWorkspaceInfo({id:workspaceId});

    const isMember = useMemo(()=>data?.isMember,[data?.isMember]);

    useEffect(()=>{
      if(isMember){
        router.push(`/workspace/${workspaceId}`);
      }
    },[isMember,router,workspaceId])

    const {mutate,isPending}=useJoin();

    const handleComplete = (value:string)=>{
        mutate({workspaceId,joinCode:value},{
            OnSuccess:(id)=>{
                router.replace(`/workspace/${id}`)
                toast.success("Workspace Joined")
            },
            OnError:()=>{
                toast.error("failed to Join")
            }
        })
    }
    if(isLoading){
        return(
            <div className="h-full flex items-center  justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }
  

 
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center bg-white p-8">
         <Image src={image} alt="Logo" width={200} height={200}/>
         <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
            <div className="flex flex-col gap-y-2 items-center justify-center">
                <h1 className="text-2xl font-bold">Join {data?.name}</h1>
                <p className="text-md text-muted-foreground">
                    Enter the workspace code to join
                </p>
            </div>
            <VerificationInput
            onComplete={handleComplete}
             classNames={{
                container:cn("flex gap-x-2",isPending && "opacity-50 cursor-not-allowed"),
                character:"uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center font-medium text-gray-500 ",
                characterInactive:"bg-muted",
                characterSelected:"bg-white text-black",
                characterFilled:"bg-white text-black"
             }}
             autoFocus
             
             />
             <div className="flex gap-x-4">
              <Button size="lg"
              variant="outline"
              asChild>
                <Link href="/">
                Back To Home
                </Link>
              </Button>
             </div>
         </div>
        </div>
    )
}

export default JoinPage