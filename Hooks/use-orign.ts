import { useEffect, useState } from "react";

export const useOrign = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const orign =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  if (!mounted) {
    return "";
  } else {
    return orign;
  }
};
