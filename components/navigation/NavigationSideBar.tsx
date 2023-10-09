import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./NavigationItem";
import ModeToggle from "../ModeToggler";
import { UserButton } from "@clerk/nextjs";

type NavigationProps = {};

const NavigationSideBar: React.FC<NavigationProps> = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col item-center h-full text-primary w-full dark:bg-black bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-2px bg-zinc-300 dark:bg-zinc-700 rounded-mg w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {server.map((serverItem) => (
          <div key={serverItem.id} className="mb-4">
            <NavigationItem
              id={serverItem.id}
              imageUrl={serverItem.imageUrl}
              name={serverItem.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              awardBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
export default NavigationSideBar;
