"ues client";

import { useSocket } from "./Providers/SocketProvider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const {isConnected} = useSocket();
  if (!isConnected) {
    return (
      <div className="absolute top-0 right-0">
        <Badge
          variant={"outline"}
          className="bg-yellow-600 text-white border-none"
        >
          Fallback: Polling every 1s
        </Badge>
      </div>
    );
  }else{
    <div className="absolute top-0 right-0">
      <Badge
        variant={"outline"}
        className="bg-emerald-600 text-white border-none"
      >live:Real-time updates</Badge>
    </div>
  }
};
