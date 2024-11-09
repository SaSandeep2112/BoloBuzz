import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {
     body: string,
     image?:Id<"_storage">,
     workspaceId:Id<"workspaces">,
     channelId?:Id<"channels">,
     conversationId?:Id<"conversations">,
     parentMessageId?:Id<"messages">

 };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  OnSuccess?: (data: ResponseType) => void;
  OnError?: (error: Error) => void;
  OnSettled?: () => void;
  throwError?: boolean;
};

export const useCreateMessage = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSucess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const mutation = useMutation(api.messages.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation(values);
        options?.OnSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        options?.OnError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");
        options?.OnSettled?.();
      }
    },
    [mutation]
  );
  return { mutate ,
    isSucess,
    isError,
    isSettled,
    isPending,
    data,
    error
  };
};
