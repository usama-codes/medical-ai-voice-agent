import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetails } from "../medical-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  historyList: SessionDetails[];
};

function HistoryTable({ historyList }: Props) {
  return (
    <div className="max-h-[500px] overflow-auto border-2 border-border rounded-2xl shadow-lg bg-card">
      <Table>
        <TableCaption className="py-4 text-muted-foreground">
          Your consultation history with AI medical specialists
        </TableCaption>
        <TableHeader className="sticky top-0 bg-card backdrop-blur-sm z-10 border-b-2 border-border">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-foreground">
              AI Specialist
            </TableHead>
            <TableHead className="font-bold text-foreground">Notes</TableHead>
            <TableHead className="font-bold text-foreground">Date</TableHead>
            <TableHead className="text-right font-bold text-foreground">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-12 text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-medium">
                    No consultation history yet
                  </p>
                  <p className="text-sm">
                    Start your first consultation to see it here
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            historyList.map((record: SessionDetails, index: number) => (
              <TableRow
                key={index}
                className="hover:bg-muted/50 transition-colors duration-200 border-b border-border/50"
              >
                <TableCell className="font-semibold text-foreground">
                  {record.selectedDoctor.specialist}
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground">
                  {record.notes}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {moment(new Date(record.createdOn)).fromNow()}
                </TableCell>
                <TableCell className="text-right">
                  <ViewReportDialog record={record} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
