"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModel } from "@/Hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy,  RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useOrign } from "@/Hooks/use-orign";
import { useState } from "react";
import axios from "axios";

export const InviteModel = () => {
  const { onOpen, isOpen, onClose, type, data } = useModel();
  const orign = useOrign();
  const isModelOpen = isOpen && type !== null && type === "invite";
  const { server } = data;
  const inviteUrl = `${orign}/invite/${server?.inviteCode}`;
  const [coped, setCoped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCoped(true);
    setTimeout(() => {
      setCoped(false);
    }, 1000);
  };
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/inviteCode`
      );
      onOpen("invite", { server: response.data });
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading}  size="icon">
              {coped ? (
                <Check />
              ) : (
                <Copy className="w-4 h-4" onClick={onCopy} />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            <RefreshCw className="w-4 h-4 ml-2" />
            Generate a new link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
