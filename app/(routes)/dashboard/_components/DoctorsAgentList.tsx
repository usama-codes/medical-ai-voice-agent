import { Doctors } from "@/app/shared/list";
import React from "react";
import DoctorCard from "./DoctorCard";

function DoctorsAgentList() {
  return (
    <section className="space-y-6" aria-labelledby="doctors-heading">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full" aria-hidden="true" />
        <h2
          id="doctors-heading"
          className="font-bold text-2xl md:text-3xl text-foreground mt-10"
        >
          AI Specialist Doctors
        </h2>
      </div>
      <p className="text-muted-foreground">
        Choose from our expert AI medical specialists for personalized
        consultations
      </p>

      <div className="grid gap-6 mt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {Doctors.map((doctor, index) => (
          <DoctorCard key={doctor.id || index} doctorAgent={doctor} />
        ))}
      </div>
    </section>
  );
}

export default DoctorsAgentList;
