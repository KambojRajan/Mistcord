import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { v4 as uuid4 } from "uuid";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
  ) {
    try {
      const profile = await currentProfile();
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
      }
      if (!params.serverId) {
        return new NextResponse("Server Id missing", { status: 400 }) 
      }
      console.log(params.serverId)
      const server = await db.server.update({
        where: {
          id: params.serverId,
          profileId: profile.id,
        },
        data: {
          inviteCode: uuid4(),
        },
      });
      return NextResponse.json(server)
    } catch (error) {
      console.error("[server id]", error);
      return new NextResponse("Internal server error", { status: 500 }) 
    }
  }
 