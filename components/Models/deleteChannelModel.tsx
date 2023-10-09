"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModel } from "@/Hooks/use-model-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string"

export const DeleteChannelModel = () => {
  const { isOpen, onClose, type, data } = useModel();
  const router = useRouter();
  const {server,channel} = data
  const isModelOpen = isOpen && type !== null && type === "deleteChannel";
  // const { server } = data;
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: params?.serverId,
        },
      });

      await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${params?.serverId}}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>
            ?, as it will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex item-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={() => {
                console.log("hello");
                onClose();
              }}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant={"primary"}
              onClick={() => {
                onClick();
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
