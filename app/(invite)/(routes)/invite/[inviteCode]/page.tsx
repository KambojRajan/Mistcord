import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { redirect } from "next/navigation";
import React from "react";

interface InvitepageProps {
  params: {
    inviteCode: string;
  };
}

const Invitepage: React.FC<InvitepageProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) return <div>loading</div>;
  if (!params.inviteCode) return redirect("/");
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) return redirect(`/servers/${existingServer.id}`);
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return null;
};
export default Invitepage;
