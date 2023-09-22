import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMemberWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};
