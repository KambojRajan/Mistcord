import ChatHeader from "@/components/chat/ChatHeader";
import { getOrCreateConversation } from "@/lib/converstion";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/database/dbConnection";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMember) return redirect("/");

  const converstion = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );
  if (!converstion) return redirect(`severs/${params.serverId}`);
  const { memberOne, memberTwo } = converstion;
  const otherMember = memberOne.id === currentMember.id ? memberTwo : memberOne;

  return (
    <div className="bg-whie dark:bg-[#313338] flex  flex-col">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
      
    </div>
  );
};

export default MemberIdPage;