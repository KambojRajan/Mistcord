import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection"; 
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Corrected import statement

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    
    if (!profile) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }], 
        },
      },
    });

    return NextResponse.json({server});
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
