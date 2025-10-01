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
    <div className="max-h-[400px] overflow-auto border rounded-lg">
      <Table>
        <TableCaption>Consultation History</TableCaption>
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead>AI Specialist</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList.map((record: SessionDetails, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {record.selectedDoctor.specialist}
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {record.notes}
              </TableCell>
              <TableCell>
                {moment(new Date(record.createdOn)).fromNow()}
              </TableCell>
              <TableCell className="text-right">
                <ViewReportDialog record={record}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;