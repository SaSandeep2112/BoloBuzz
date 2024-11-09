import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Quill from 'quill';
import { useCreateMessage } from '@/features/messages/api/use-create-message';
import { useworkspaceId } from '@/hooks/use-workspace-id';
import { useChannelId } from '@/hooks/use-channel-id';
import { toast } from 'sonner';
import { useGenerateUploadUrl } from '@/features/upload/api/use-generare-upload-url';
import { Id } from '../../../../../../convex/_generated/dataModel';
const  Editor = dynamic(()=>import('@/components/editor'),{ssr:false});
interface ChatInputProps{
  placeholder : string;

}
type CreateMessageValues ={channelId:Id<"channels">,
  workspaceId:Id<"workspaces">
  body:string,
  image:Id<"_storage"> | undefined
}
const ChatInput = ({placeholder}:ChatInputProps) => {
  
  const [editorKey,setEditorKey] = useState(0);
  
  const  [isPending,setIspending] = useState(false)
  const editorRef = useRef<Quill | null>(null);
  const workspaceId = useworkspaceId();
  const channelId = useChannelId();

  const {mutate:generateUploadUrl}= useGenerateUploadUrl();
  const {mutate:createMessage} = useCreateMessage();
  
  const handleSubmit =async({
    body,image
  }:{body:string,image:File | null})=>{
    console.log({body,image});
    try {
      setIspending(true);

      editorRef?.current?.enable(false)

      const values :CreateMessageValues={
        channelId,workspaceId,body,image:undefined
      }

      if(image){
        const url = await generateUploadUrl({},{throwError:true});
        console.log({url})  
        if(!url){
            throw new Error("URL not found")
          }
        const result = await fetch(url,{
          method:"POST",
          headers:{"Content-Type":image.type},
          body:image
        });
        console.log({result})
        if(!result.ok){
           throw new Error("Failed to upload image");
        }

        const {storageId} = await result.json();
        values.image = storageId;
      }
      await createMessage(
        values
      ,{throwError:true})
      setEditorKey((prev)=> prev+1)
    } catch (error) {
      toast.error("Failed to send message");
    } finally{
      setIspending(false);
      editorRef?.current?.enable(true)
    }
  }
  return (
    <div className='px-5 w-full '>
        <Editor 
        key={editorKey}       
        variant='update'
        placeholder='Test Placeholder'
        OnSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
        />
      
    </div>
  )
}

export default ChatInput
