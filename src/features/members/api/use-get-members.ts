import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
interface useCurrentMemberProps{
    workspaceId:Id<"workspaces">;
}
export const useGetMember = ({workspaceId}:useCurrentMemberProps)=>{
    const data = useQuery(api.members.get,{workspaceId});

    const isLoading = data===undefined;

    return { 
        data,  
        isLoading
    };
}