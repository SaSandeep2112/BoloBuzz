import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaChevronDown } from "react-icons/fa";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUpdateChannel } from "@/features/channel/api/use-update-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useRemoveChannel } from "@/features/channel/api/use-delete-channel";
import { useRouter } from "next/navigation";
import { useworkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface HeaderProps {
  channelName: string;
}

const Header = ({ channelName }: HeaderProps) => {
  const router = useRouter();
  const workspaceId = useworkspaceId();
  const channelId = useChannelId();
  const [value, setValue] = useState(channelName);
  const [editOpen, setEditOpen] = useState(false);

  const { data: member } = useCurrentMember({ workspaceId });
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this channel",
    "You are about to delete this channel.This action is irreversible  "
  );

  const { mutate: updateChannel, isPending: updatingChannel } =
    useUpdateChannel();
  const { mutate: removeChannel, isPending: isRemovingChannel } =
    useRemoveChannel();
  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;
    setEditOpen(value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };
  const handleDelte = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeChannel(
      { id: channelId },
      {
        OnSuccess: () => {
          toast.success("Channel Deleted Successfully");
          router.push(`/workspace/${workspaceId}`);
        },
        OnError: () => {
          toast.error("Unable to delete workspace");
        },
      }
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateChannel(
      {
        id: channelId,
        name: value,
      },
      {
        OnSuccess: () => {
          toast.success("Channel Updated");
          setEditOpen(false);
        },
        OnError: () => {
          toast.error("Unable to Update Channel");
        },
      }
    );
  };
  return (
    <div className="bg-white border-b h-[49px] flex items-center  px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
          >
            <span className="truncate">{channelName}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>{channelName}</DialogTitle>
          </DialogHeader>
          <div className="p-4 pb-4 flex-col flex gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-white">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>

                    {member?.role === "admin" && (
                      <p className="text text-[#1264a3] hover:underline font-semibold">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm">#{channelName}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renam this channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={value}
                    disabled={updatingChannel}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g- plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={updatingChannel}>
                        Cancel
                      </Button>
                      <Button disabled={updatingChannel}>Save</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === "admin" && (
              <button
                onClick={handleDelte}
                disabled={isRemovingChannel}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer hover:bg-gray-80 text-pink"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete Channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
