"use client";

import { ServerWithMemberWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Lock, Plus, Settings } from "lucide-react";
import { ActionToolTip } from "../ActionToolTip";
import { useModel } from "@/Hooks/use-model-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMemberWithProfile;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModel();
  return (
    <div className="flex item-center justify-between py-2">
      <p className="text-sm uppercase font-semibold text-zinc-500 dark:text-zinc-400 ">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionToolTip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel",{channelType})}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </ActionToolTip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionToolTip label="Manage Members">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </ActionToolTip>
      )}
      
    </div>
  );
};
