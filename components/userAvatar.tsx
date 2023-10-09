import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  className,
}: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} alt="Avatar" className="rounded-full" />
    </Avatar>
  );
};
