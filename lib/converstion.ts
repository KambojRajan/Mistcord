import { db } from "./database/dbConnection";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  const conversation =
    (await findConversation(memberOneId, memberTwoId)) ||
    (await findConversation(memberTwoId, memberOneId));
  if (conversation) {
    return conversation;
  } else {
    const newConversation = await createConversation(memberOneId, memberTwoId);
    return newConversation;
  }
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
    return conversation;
  } catch {
    return null;
  }
};

const createConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    const conversation = await db.conversation.create({
      data: {
        memberOneId: memberOneId,
        memberTwoId: memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
    return conversation;
  } catch {
    return null;
  }
};
