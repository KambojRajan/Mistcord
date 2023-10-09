import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const serverId = params.serverId;
    if (!serverId) {
      return new NextResponse("server Id missing", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: { not: profile.id },
        members: { some: { profileId: profile.id } },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_LEAVE_ROUTE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
