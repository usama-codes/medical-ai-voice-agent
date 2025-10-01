"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Crown, Loader2Icon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voice?: string;
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { has } = useAuth();
  // @ts-ignore
  const paidUser = has && has("pro");

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: "New Consultation",
      selectedDoctor: doctorAgent,
    });

    console.log(result.data);

    if (result.data?.sessionId) {
      console.log("Session started with ID:", result.data.sessionId);

      // Navigate to the medical agent page with the sessionId
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };


  return (
    <div className="overflow-hidden lg ml-15 relative">
      {doctorAgent?.subscriptionRequired && (
        <div className="absolute m-2 right-0 bg-gradient-to-r from-yellow-300 to-yellow-400 p-1.5 rounded-full shadow-lg">
          <Crown className="h-5 w-5 text-white" />
        </div>
      )}
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={200}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold text-lg mt-2">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1 text-sm text-gray-500">
        {doctorAgent.description}
      </p>
      <Button
        className="w-full mt-2"
        disabled={!paidUser && doctorAgent?.subscriptionRequired}
        onClick={onStartConsultation}
      >
        Consult {loading ? <Loader2Icon className="animate-spin" /> : <IconArrowRight />}
      </Button>
    </div>
  );
}

export default DoctorCard;
