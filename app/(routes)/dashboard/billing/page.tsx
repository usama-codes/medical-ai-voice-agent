import { PricingTable } from "@clerk/nextjs";
import React from "react";

function Billing() {
  return (
    <div className="px-10 md:px-24 lg:px-48">
      <h2 className="font-bold text-3xl mb-20 px-10">Join Pro!</h2>
      <div className="[&>*]:px-4 [&>*>*]:gap-6">
        <PricingTable />
      </div>
    </div>
  );
}

export default Billing;
