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
    console.log(result.data);
    setHistoryList(result.data);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });

    console.log(result.data);

    if (result.data?.sessionId) {
      console.log("Session started with ID:", result.data.sessionId);

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

      console.log(result.data);

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
          className="mt-3"
          disabled={!paidUser && historyList?.length >= 1}
        >
          + Start a Consultation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details:</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2>Add Symptoms</h2>
                <Textarea
                  placeholder="e.g. I have a headache and fever..."
                  className="w-full h-[150px] mt-2 mb-5"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2>Select a Doctor</h2>
                <div className="grid grid-cols-3 gap-5">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctors
                      key={index}
                      doctorAgent={doctor}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} className="transition cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button
              disabled={!note || loading}
              onClick={() => OnClickNext()}
              className="transition cursor-pointer"
            >
              Next{" "}
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          ) : (
            <Button
              disabled={!selectedDoctor || loading}
              onClick={() => onStartConsultation()}
              className="transition cursor-pointer"
            >
              Start Consultation
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewUserDialog;
