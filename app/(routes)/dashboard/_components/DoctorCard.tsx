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

    // console.log(result.data);

    if (result.data?.sessionId) {
      // console.log("Session started with ID:", result.data.sessionId);

      // Navigate to the medical agent page with the sessionId
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30"
      aria-label={`Doctor consultation card for ${doctorAgent.specialist}`}
    >
      {doctorAgent?.subscriptionRequired && (
        <div
          className="absolute top-3 right-3 z-10 bg-gradient-to-br from-amber-400 to-yellow-500 p-2 rounded-full shadow-lg ring-2 ring-yellow-300/50 animate-pulse"
          aria-label="Premium feature"
          title="Premium feature - subscription required"
        >
          <Crown className="h-5 w-5 text-white drop-shadow" />
        </div>
      )}
      <div className="relative overflow-hidden">
        <Image
          src={doctorAgent.image}
          alt={`${doctorAgent.specialist} consultation`}
          width={200}
          height={200}
          className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
      <div className="p-5 space-y-4">
        <div>
          <h2 className="font-bold text-xl mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {doctorAgent.specialist}
          </h2>
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {doctorAgent.description}
          </p>
        </div>
        <Button
          className="w-full shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group/btn relative overflow-hidden"
          disabled={!paidUser && doctorAgent?.subscriptionRequired}
          onClick={onStartConsultation}
          aria-label={`Start consultation with ${doctorAgent.specialist}`}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2" aria-hidden="true" />
              <span>Starting...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Consult Now</span>
              <IconArrowRight
                className="ml-2 transition-transform group-hover/btn:translate-x-1 relative z-10"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

export default DoctorCard;
