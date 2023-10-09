import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID not found", { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse("Member ID not found", { status: 400 });
    }
    if (!profile) {
      return new Response("Unauthorized", { status: 401 });
    }
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return Response.json(server);
  } catch (error) {
    console.log("[Member_ID_DELETE_ERROR]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID not found", { status: 400 });
    }
    if (!params.memberId) {
      return new NextResponse("Member ID not found", { status: 400 });
    }
    if (!profile) {
      return new Response("Unauthorized", { status: 401 });
    }
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        members: {
          update: {
            where: { id: params.memberId, profileId: { not: profile.id } },
            data: {
              role: role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return Response.json(server);
  } catch (error) {
    console.log("[Member_ID_PATCH_ERROR]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
