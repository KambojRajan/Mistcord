import { getAuth } from "@clerk/nextjs/server";
import { db } from "./database/dbConnection";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req:NextApiRequest) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error) {
    console.error("Error in currentProfile:", error);
    throw error; 
  }
};
