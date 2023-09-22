import React from "react";
import { currentProfile } from "@/lib/currentProfile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/database/dbConnection";
import { redirect } from "next/navigation";
import ServerSidebar from "@/components/Server/ServerSidebar";

type LayoutProps = {
  children: React.ReactNode;
  params: { serverId: string };
};

const Layout: React.FC<LayoutProps> = async ({ children, params }: LayoutProps) => {
  const serverId = params.serverId; 
 
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  // console.log("***params***",params);
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default Layout;
