"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorCard, { doctorAgent } from "./DoctorCard";
import SuggestedDoctors from "./SuggestedDoctors";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetails } from "../medical-agent/[sessionId]/page";

function NewUserDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [historyList, setHistoryList] = useState<SessionDetails[]>([]);
  const router = useRouter();

  const { has } = useAuth();
  // @ts-ignore
  const paidUser = has && has("pro");

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    // console.log(result.data);
    setHistoryList(result.data);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });

    // console.log(result.data);

    if (result.data?.sessionId) {
      // console.log("Session started with ID:", result.data.sessionId);

      // Navigate to the medical agent page with the sessionId
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }
    setLoading(false);
  };

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "/api/suggest-doctors",
        { notes: note },
        {
          timeout: 30000, // 30 second timeout
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(result.data);

      // Validate the response
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        setSuggestedDoctors(result.data);
      } else if (result.data?.error) {
        // Handle API errors gracefully
        console.error("API Error:", result.data.error);
        // Fallback to showing all doctors or a subset
        setSuggestedDoctors(getDefaultDoctors());
      } else {
        // Fallback for unexpected response format
        setSuggestedDoctors(getDefaultDoctors());
      }
    } catch (error) {
      console.error("Request failed:", error);
      // Fallback to default doctors on network/server errors
      setSuggestedDoctors(getDefaultDoctors());
    } finally {
      setLoading(false);
    }
  };

  // Fallback function to provide default doctors
  const getDefaultDoctors = () => {
    // Return first 3 doctors as fallback
    const { Doctors } = require("@/app/shared/list");
    return Doctors.slice(0, 3);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="shadow-lg hover:shadow-xl"
          disabled={!paidUser && historyList?.length >= 1}
          aria-label="Start a new medical consultation"
        >
          + Start a Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {!suggestedDoctors
              ? "Start Your Consultation"
              : "Select Your Specialist"}
          </DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Describe your symptoms or health concerns to help us recommend
                  the right specialist
                </p>
                <div>
                  <label
                    htmlFor="symptoms"
                    className="text-sm font-semibold text-foreground mb-2 block"
                  >
                    Your Symptoms
                  </label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g. I have a headache and fever that started yesterday..."
                    className="w-full h-[150px] resize-none border-2 focus:border-primary transition-colors"
                    onChange={(e) => setNote(e.target.value)}
                    aria-label="Describe your symptoms"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Based on your symptoms, we recommend these specialists
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctors
                      key={doctor.id || index}
                      doctorAgent={doctor}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                  \n{" "}
                </div>
                \n{" "}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="transition-all hover:scale-105"
              aria-label="Cancel consultation"
            >
              Cancel
            </Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button
              disabled={!note || loading}
              onClick={() => OnClickNext()}
              className="transition-all hover:scale-105 shadow-md"
              aria-label="Continue to doctor selection"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRightIcon className="ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor || loading}
              onClick={() => onStartConsultation()}
              className="transition-all hover:scale-105 shadow-md"
              aria-label="Start consultation with selected doctor"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" aria-hidden="true" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <span>Start Consultation</span>
                  <ArrowRightIcon className="ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewUserDialog;
