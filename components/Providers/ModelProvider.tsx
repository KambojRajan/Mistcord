"use client";

import { InviteModel } from "@/components/Models/InviteModel";
import { CreateServerModel } from "../Models/CreateServerModel";
import React, { useEffect, useState } from "react";
import { EditServerModel } from "../Models/EditServerModel";
import { MembersModel } from "../Models/MembersModel";
import { CreateChannelModel } from "../Models/CreateChannelModel";
import { LeaveServerModel } from "../Models/LeaveServerModel";
import { DeleteServerModel } from "../Models/deleteServerModel";
import { DeleteChannelModel } from "../Models/deleteChannelModel";
import { EditChannelModel } from "../Models/EditChannelModel";
import MessageFile from "../Models/MessageFile";

type ModelProviderProps = {};

const ModelProvider: React.FC<ModelProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModel />
      <InviteModel />
      <EditServerModel />
      <MembersModel />
      <CreateChannelModel />
      <LeaveServerModel />
      <DeleteServerModel />
      <DeleteChannelModel />
      <EditChannelModel />
      <MessageFile />
    </>
  );
};
export default ModelProvider;
