"use client";
import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../MobileToggle";
import { UserAvatar } from "../userAvatar";
import { SocketIndicator } from "../SocketIndicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="flex items-center h-12 border-b-2 border-neutral-200 dark:border-neutral-800 px-3">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="text-md font-semibold text-black dark:text-white whitespace-nowrap overflow-hidden overflow-ellipsis">
        {name}
      </p>
      <div className="ml-auto flex item-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
