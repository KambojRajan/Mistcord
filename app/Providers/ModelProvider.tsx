"use client";

import { InviteModel } from "@/components/Models/InviteModel";
import { CreateServerModel } from "../../components/Models/CreateServerModel";
import React, { useEffect, useState } from "react";

type ModelProviderProps = {};

const ModelProvider: React.FC<ModelProviderProps> = () => {
  const [ isMounted, setIsMounted ] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModel />
      <InviteModel/>
    </>
  );
};
export default ModelProvider;
