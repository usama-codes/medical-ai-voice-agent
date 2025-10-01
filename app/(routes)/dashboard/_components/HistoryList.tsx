"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import NewUserDialog from "./NewUserDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetails } from "../medical-agent/[sessionId]/page";

function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetails[]>([]);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    console.log(result.data);
    setHistoryList(result.data);
  };

  return (
    <div className="mt-10">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 p-7 border-dashed rounded-2xl border-2">
          <Image
            src={"/medical-assistance.png"}
            alt="empty"
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p className="text-gray-500">
            It looks like you haven't consulted any doctors yet.
          </p>
          <NewUserDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
}

export default HistoryList;
