"use client";
import { Search } from "lucide-react";
import React, { Key, useEffect } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command";
import { CommandEmpty, CommandItem } from "cmdk";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export default function ServerSearch({ data }: ServerSearchProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && e.ctrlKey) || e.metaKey) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);
  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "member")
      return router.push(`/servers/${params?.serverId}/converstions/${id}`);
    if (type === "channel")
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 flex item-center rounded-md gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark/:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">CTRL</span> + K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (data?.length === 0) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ icon, name, id }) => (
                  <CommandItem
                    onSelect={() => {
                      onClick({ id, type });
                    }}
                    key={id}
                  >
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
