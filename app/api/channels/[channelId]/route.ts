import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!params.channelId) {
      return new NextResponse("CHANNEL ID NOT FOUND", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("SERVER ID NOT FOUND", { status: 400 });
    }
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();
    const serverId = searchParams.get("serverId");
    if (!params.channelId) {
      return new NextResponse("CHANNEL ID NOT FOUND", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("SERVER ID NOT FOUND", { status: 400 });
    }
    if (!profile) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (name === "general") {
      return new NextResponse("Cannot edit general channel", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_PATCH]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
