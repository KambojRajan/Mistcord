import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/database/dbConnection";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method !== "POST"){
        return res.status(405).json({message: "Method not allowed"});
    }
    try {
        const {content,fileUrl} = req.body;
        const profile = await currentProfilePages(req)
        const {serverId,channelId} = req.query;
        if(!profile){
             return res.status(401).json({message: "Unauthorized"});
        }
        if(!serverId){
            return res.status(400).json({message: "serverId is required"});
        }
        if(!channelId){
            return res.status(400).json({message: "Content is missing"});
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members:{
                    some:{
                        profileId: profile.id
                    }
                },
            },
            include:{
                members:true
            }
        })
        if(!server){
            return res.status(404).json({message: "Server not found"});
        }
        const channel = await db.channel.findFirst({
            where:{
                id: channelId as string,
                serverId: serverId as string,
            }
        })
        if(!channel){
            return res.status(404).json({message: "Channel not found"});
        }

        const members = server.members.find((member) => member.profileId === profile.id);

        if(!members){
            return res.status(403).json({message: "member not found"});
        }
        const message = await db.message.create({
            data:{
                content,
                fileUrl,
                channelId: channel.id as string,
                memberId: members.id,
            },
            include:{
                member:{
                    include:{
                        profile:true
                    }
                }
            }
        })

        const channelKey = `chat:${channelId}:messages`;
        res?.socket?.server?.io?.emit(channelKey, message);
        return res.status(200).json({message});

    } catch (error) {
        console.error("[MESSAGES_POST]", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
