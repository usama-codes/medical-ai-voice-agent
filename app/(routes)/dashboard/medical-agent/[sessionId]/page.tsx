"use client";

import axios from "axios";
import { LargeNumberLike } from "crypto";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { div } from "motion/react-m";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetails = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type message = {
  role: string;
  text: string;
};

function MedicalAgent() {
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  // Timer effect for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStarted) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStarted]);

  const GetSessionDetails = async () => {
    const res = await axios.get("/api/session-chat?sessionId=" + sessionId);
    // console.log(res.data);
    setSessionDetails(res.data);
  };

  const startCall = async () => {
    try {
      setLoading(true);

      // Check if API key exists
      if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
        toast.error(
          "Vapi API key is not configured. Please check your environment variables."
        );
        setLoading(false);
        return;
      }

      // Initialize Vapi with API key
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
      setVapiInstance(vapi);

      vapi.on("call-start", async () => {
        // console.log("Call started");
        setCallStarted(true);
        setLoading(false);
      });

      vapi.on("call-end", () => {
        // console.log("Call ended");
        setCallStarted(false);
      });

      vapi.on("error", (error: any) => {
        console.error("Vapi error:", error);
        setCallStarted(false);
        setLoading(false);
        toast.error("Failed to connect to voice agent. Please try again.");
      });

      vapi.on("message", (message: any) => {
        // Only log complete transcripts when role ends, not every partial message
        if (message.type === "transcript") {
          const { role, transcriptType, transcript } = message;
          // console.log(`${message.role}: ${message.transcript}`);
          if (transcriptType === "partial") {
            setLiveTranscript(transcript);
            setCurrentRole(role);
          } else if (transcriptType === "final") {
            setMessages((prevMessages: any) => [
              ...prevMessages,
              { role: role, text: transcript },
            ]);
            setLiveTranscript("");
            setCurrentRole(null);
          }

          if (message.type === "response") {
            // console.log("Agent:", message.text);
          }
        }
      });

      vapi.on("speech-start", () => {
        // console.log("Assistant started speaking");
        setCurrentRole("Assistant");
      });

      vapi.on("speech-end", () => {
        // console.log("Assistant stopped speaking");
        setCurrentRole("User");
      });

      // Start the call last
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
    } catch (error) {
      console.error("Failed to start call:", error);
      setCallStarted(false);
      setLoading(false);
      toast.error(
        "Failed to start call. Please check your connection and try again."
      );
    }
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/generate-report", {
      sessionId: sessionId,
      sessionDetails: sessionDetails,
      messages: messages,
    });
    // console.log(result.data);
    return result.data;
  };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;

    try {
      vapiInstance.stop();
      setCallStarted(false);
      setVapiInstance(null);
      setLoading(false);
    } catch (error) {
      console.error("Error ending call:", error);
      setCallStarted(false);
    }

    const result = await GenerateReport();
    setLoading(false);
    toast.success("Your report has been generated!");
    router.replace("/dashboard");
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted
                ? "text-green-500 bg-green-500"
                : "text-red-500 bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">
          {String(Math.floor(callDuration / 60)).padStart(2, "0")}:
          {String(callDuration % 60).padStart(2, "0")}
        </h2>
      </div>
      {sessionDetails && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist ?? ""}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetails?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Voice Agent</p>

          <div className="mt-20 overflow-y-auto justify-center flex flex-col px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-3).map((msg, index) => (
              <h2 className="text-lg text-gray-400 p-2" key={index}>
                {msg.role} : {msg.text}
              </h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg">
                {currentRole} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-20" onClick={startCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}{" "}
              Start Call
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              className="mt-20"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />} End
              Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalAgent;
