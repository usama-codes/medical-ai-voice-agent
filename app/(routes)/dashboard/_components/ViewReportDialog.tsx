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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-blue-600">
            Medical AI Report
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Session Information */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-lg text-blue-700 mb-3">
              Session Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Specialist:</span>
                <span className="ml-2">
                  {record.selectedDoctor?.specialist || "General Physician"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="ml-2">
                  {moment(new Date(record.createdOn)).format(
                    "MMMM Do YYYY, h:mm A"
                  )}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Time Ago:</span>
                <span className="ml-2">
                  {moment(new Date(record.createdOn)).fromNow()}
                </span>
              </div>
            </div>
          </div>

          {/* Patient Notes */}
          {record.notes && (
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg text-green-700 mb-3">
                Patient Notes & Chief Complaint
              </h3>
              <p className="text-gray-800 leading-relaxed">{record.notes}</p>
            </div>
          )}

          {/* Medical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Symptoms */}
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-bold text-lg text-orange-700 mb-3">
                Symptoms Reported
              </h3>
              <div className="space-y-2">
                {(record.report as any)?.symptoms ? (
                  <ul className="text-gray-800 space-y-1">
                    {Array.isArray((record.report as any).symptoms) ? (
                      (record.report as any).symptoms.map(
                        (symptom: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            {symptom}
                          </li>
                        )
                      )
                    ) : (
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        {(record.report as any).symptoms}
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-600 italic">
                    No specific symptoms documented
                  </p>
                )}
              </div>
            </div>

            {/* Duration & Severity */}
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg text-yellow-700 mb-3">
                Duration & Severity
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span className="ml-2">
                    {(record.report as any)?.duration || "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Severity:</span>
                  <span
                    className={`ml-2 font-medium ${
                      (record.report as any)?.severity === "High" ||
                      (record.report as any)?.severity === "Severe"
                        ? "text-red-600"
                        : (record.report as any)?.severity === "Medium" ||
                          (record.report as any)?.severity === "Moderate"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {(record.report as any)?.severity || "Not assessed"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Medications Mentioned */}
          <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
            <h3 className="font-bold text-lg text-teal-700 mb-3">
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
                          className="bg-white p-3 rounded border"
                        >
                          <div className="font-semibold text-teal-800">
                            {typeof medication === "object"
                              ? medication.name
                              : medication}
                          </div>
                          {typeof medication === "object" &&
                            medication.dosage && (
                              <div className="text-sm text-gray-600">
                                Dosage: {medication.dosage}
                              </div>
                            )}
                          {typeof medication === "object" &&
                            medication.frequency && (
                              <div className="text-sm text-gray-600">
                                Frequency: {medication.frequency}
                              </div>
                            )}
                        </div>
                      )
                    )
                  ) : (
                    <div className="bg-white p-3 rounded border">
                      <div className="font-semibold text-teal-800">
                        {(record.report as any).medications}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  No medications mentioned in this consultation
                </p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-bold text-lg text-indigo-700 mb-3">
              Recommendations
            </h3>
            <div className="space-y-2">
              {(record.report as any)?.recommendations ? (
                <ul className="text-gray-800 space-y-2">
                  {Array.isArray((record.report as any).recommendations) ? (
                    (record.report as any).recommendations.map(
                      (recommendation: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-600 mr-2 mt-1">✓</span>
                          <span>{recommendation}</span>
                        </li>
                      )
                    )
                  ) : (
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2 mt-1">✓</span>
                      <span>{(record.report as any).recommendations}</span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-600 italic">
                  No specific recommendations provided
                </p>
              )}
            </div>
          </div>

          {/* AI Generated Report */}
          {record.report ? (
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-500">
              <h3 className="font-bold text-lg text-gray-700 mb-3">
                AI Assessment & Report
              </h3>
              <div className="prose prose-sm max-w-none">
                {typeof record.report === "object" && record.report !== null ? (
                  <div className="space-y-3">
                    {(record.report as any).content ? (
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {(record.report as any).content}
                      </div>
                    ) : (
                      <pre className="text-gray-800 text-sm whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(record.report, null, 2)}
                      </pre>
                    )}
                    {(record.report as any).generatedAt && (
                      <p className="text-xs text-gray-500 mt-3 pt-3 border-t">
                        Report generated:{" "}
                        {moment((record.report as any).generatedAt).format(
                          "MMMM Do YYYY, h:mm A"
                        )}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed">
                    {record.report as string}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg text-yellow-700 mb-2">
                No Report Available
              </h3>
              <p className="text-gray-700">
                No AI-generated report is available for this consultation
                session.
              </p>
            </div>
          )}

          {/* Doctor Information */}
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-lg text-purple-700 mb-3">
              AI Doctor Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Specialty:</span>
                <span className="ml-2">
                  {record.selectedDoctor?.specialist}
                </span>
              </div>
              {record.selectedDoctor?.description && (
                <div>
                  <span className="font-semibold text-gray-700">
                    Description:
                  </span>
                  <span className="ml-2">
                    {record.selectedDoctor.description}
                  </span>
                </div>
              )}
              {record.selectedDoctor && (
                <div>
                  <span className="font-semibold text-gray-700">
                    Access Level:
                  </span>
                  <span className="ml-2 text-orange-600 font-medium">
                    Premium Specialist
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 text-sm">
            <h3 className="font-bold text-lg text-red-700 mb-2">
              ⚠️ Medical Disclaimer
            </h3>
            <p className="text-red-800 leading-relaxed">
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
