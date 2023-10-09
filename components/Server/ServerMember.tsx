"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../userAvatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
};
export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const param = useParams();
  const router = useRouter();
  const icon = roleIconMap[member.role];
  const onClick = () => {
    router.push(`/servers/${param.serverId}/conversations/${member.id}`);
  };
  return (
    <Button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex item-center gap-x-2 w-full hover:bg-zinc-7000/10 dark:hover::bg-zinc-7000/50 transition mb-1",
        param?.memberId === member.id && "bg-zinc-700/20 bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          param?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </Button>
  );
};