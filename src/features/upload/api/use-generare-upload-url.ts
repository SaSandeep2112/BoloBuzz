import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type ResponseType = string | null;
type Options = {
  OnSuccess?: (data: ResponseType) => void;
  OnError?: (error: Error) => void;
  OnSettled?: () => void;
  throwError?: boolean;
};

export const useGenerateUploadUrl = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "pending" | "settled" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSucess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const mutation = useMutation(api.upload.generateUploadUrl);

  const mutate = useCallback(
    async (_values:{}, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation();
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
