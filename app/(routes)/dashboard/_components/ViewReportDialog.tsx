import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetails } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetails;
};

function ViewReportDialog({ record }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            Medical AI Report
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Session Information */}
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg border-l-4 border-primary backdrop-blur-sm">
            <h3 className="font-bold text-lg text-primary mb-3">
              Session Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-foreground/80">
                  Specialist:
                </span>
                <span className="ml-2 text-foreground">
                  {record.selectedDoctor?.specialist || "General Physician"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-foreground/80">Date:</span>
                <span className="ml-2 text-foreground">
                  {moment(new Date(record.createdOn)).format(
                    "MMMM Do YYYY, h:mm A"
                  )}
                </span>
              </div>
              <div>
                <span className="font-semibold text-foreground/80">
                  Time Ago:
                </span>
                <span className="ml-2 text-foreground">
                  {moment(new Date(record.createdOn)).fromNow()}
                </span>
              </div>
            </div>
          </div>

          {/* Patient Notes */}
          {record.notes && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-lg border-l-4 border-emerald-500 dark:border-emerald-400">
              <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 mb-3">
                Patient Notes & Chief Complaint
              </h3>
              <p className="text-foreground/90 leading-relaxed">
                {record.notes}
              </p>
            </div>
          )}

          {/* Medical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Symptoms */}
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border-l-4 border-orange-500 dark:border-orange-400">
              <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3">
                Symptoms Reported
              </h3>
              <div className="space-y-2">
                {(record.report as any)?.symptoms ? (
                  <ul className="text-foreground/90 space-y-1">
                    {Array.isArray((record.report as any).symptoms) ? (
                      (record.report as any).symptoms.map(
                        (symptom: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-600 dark:text-orange-400 mr-2">
                              •
                            </span>
                            {symptom}
                          </li>
                        )
                      )
                    ) : (
                      <li className="flex items-start">
                        <span className="text-orange-600 dark:text-orange-400 mr-2">
                          •
                        </span>
                        {(record.report as any).symptoms}
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    No specific symptoms documented
                  </p>
                )}
              </div>
            </div>

            {/* Duration & Severity */}
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-400">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-400 mb-3">
                Duration & Severity
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-foreground/80">
                    Duration:
                  </span>
                  <span className="ml-2 text-foreground">
                    {(record.report as any)?.duration || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-foreground/80">
                    Severity:
                  </span>
                  <span
                    className={`ml-2 font-medium ${
                      (record.report as any)?.severity === "High" ||
                      (record.report as any)?.severity === "Severe"
                        ? "text-red-600 dark:text-red-400"
                        : (record.report as any)?.severity === "Medium" ||
                          (record.report as any)?.severity === "Moderate"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {(record.report as any)?.severity || "Not assessed"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Medications Mentioned */}
          <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border-l-4 border-teal-500 dark:border-teal-400">
            <h3 className="font-bold text-lg text-teal-700 dark:text-teal-400 mb-3">
              Medications Mentioned
            </h3>
            <div className="space-y-2">
              {(record.report as any)?.medications ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.isArray((record.report as any).medications) ? (
                    (record.report as any).medications.map(
                      (medication: any, index: number) => (
                        <div
                          key={index}
                          className="bg-card p-3 rounded border border-border"
                        >
                          <div className="font-semibold text-teal-800 dark:text-teal-300">
                            {typeof medication === "object"
                              ? medication.name
                              : medication}
                          </div>
                          {typeof medication === "object" &&
                            medication.dosage && (
                              <div className="text-sm text-muted-foreground">
                                Dosage: {medication.dosage}
                              </div>
                            )}
                          {typeof medication === "object" &&
                            medication.frequency && (
                              <div className="text-sm text-muted-foreground">
                                Frequency: {medication.frequency}
                              </div>
                            )}
                        </div>
                      )
                    )
                  ) : (
                    <div className="bg-card p-3 rounded border border-border">
                      <div className="font-semibold text-teal-800 dark:text-teal-300">
                        {(record.report as any).medications}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No medications mentioned in this consultation
                </p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg border-l-4 border-indigo-500 dark:border-indigo-400">
            <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-3">
              Recommendations
            </h3>
            <div className="space-y-2">
              {(record.report as any)?.recommendations ? (
                <ul className="text-foreground/90 space-y-2">
                  {Array.isArray((record.report as any).recommendations) ? (
                    (record.report as any).recommendations.map(
                      (recommendation: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-600 dark:text-indigo-400 mr-2 mt-1">
                            ✓
                          </span>
                          <span>{recommendation}</span>
                        </li>
                      )
                    )
                  ) : (
                    <li className="flex items-start">
                      <span className="text-indigo-600 dark:text-indigo-400 mr-2 mt-1">
                        ✓
                      </span>
                      <span>{(record.report as any).recommendations}</span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-muted-foreground italic">
                  No specific recommendations provided
                </p>
              )}
            </div>
          </div>

          {/* AI Generated Report */}
          {record.report ? (
            <div className="bg-muted/50 dark:bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-lg text-foreground mb-3">
                AI Assessment & Report
              </h3>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {typeof record.report === "object" && record.report !== null ? (
                  <div className="space-y-3">
                    {(record.report as any).content ? (
                      <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                        {(record.report as any).content}
                      </div>
                    ) : (
                      <pre className="text-foreground/90 text-sm whitespace-pre-wrap overflow-x-auto bg-card p-3 rounded border border-border">
                        {JSON.stringify(record.report, null, 2)}
                      </pre>
                    )}
                    {(record.report as any).generatedAt && (
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        Report generated:{" "}
                        {moment((record.report as any).generatedAt).format(
                          "MMMM Do YYYY, h:mm A"
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-foreground/90 leading-relaxed">
                    {record.report as string}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border-l-4 border-yellow-500 dark:border-yellow-400">
              <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-400 mb-2">
                No Report Available
              </h3>
              <p className="text-foreground/80">
                No AI-generated report is available for this consultation
                session.
              </p>
            </div>
          )}

          {/* Doctor Information */}
          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border-l-4 border-purple-500 dark:border-purple-400">
            <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 mb-3">
              AI Doctor Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-foreground/80">
                  Specialty:
                </span>
                <span className="ml-2 text-foreground">
                  {record.selectedDoctor?.specialist}
                </span>
              </div>
              {record.selectedDoctor?.description && (
                <div>
                  <span className="font-semibold text-foreground/80">
                    Description:
                  </span>
                  <span className="ml-2 text-foreground">
                    {record.selectedDoctor.description}
                  </span>
                </div>
              )}
              {record.selectedDoctor && (
                <div>
                  <span className="font-semibold text-foreground/80">
                    Access Level:
                  </span>
                  <span className="ml-2 text-orange-600 dark:text-orange-400 font-medium">
                    Premium Specialist
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border-l-4 border-red-500 dark:border-red-400 text-sm">
            <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">
              ⚠️ Medical Disclaimer
            </h3>
            <p className="text-red-800 dark:text-red-300 leading-relaxed">
              This report is generated by an AI system and is for informational
              purposes only. It should not be considered as professional medical
              advice, diagnosis, or treatment. Always consult with qualified
              healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
