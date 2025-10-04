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
    // console.log(result.data);
    setHistoryList(result.data);
  };

  return (
    <section className="space-y-6" aria-labelledby="history-heading">
      {historyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 p-12 border-dashed rounded-2xl border-2 border-border bg-muted/30 hover:bg-muted/50 transition-colors">
          <Image
            src={"/medical-assistance.png"}
            alt="No consultations illustration"
            width={150}
            height={150}
            className="opacity-75"
          />
          <div className="text-center space-y-2">
            <h2
              id="history-heading"
              className="font-bold text-2xl text-foreground"
            >
              No Recent Consultations
            </h2>
            <p className="text-muted-foreground max-w-md">
              It looks like you haven't consulted any doctors yet. Start your
              first consultation to get personalized medical advice.
            </p>
          </div>
          <NewUserDialog />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-1 bg-primary rounded-full"
              aria-hidden="true"
            />
            <h2
              id="history-heading"
              className="font-bold text-2xl md:text-3xl text-foreground"
            >
              Consultation History
            </h2>
          </div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </section>
  );
}

export default HistoryList;
