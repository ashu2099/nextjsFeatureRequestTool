"use client";

import { ArrowLeft } from "lucide-react";
import useFeatureRequestDisplay from "./useFeatureRequestDisplay";
import { Button } from "@/components/ui/button";
import FeatureDetailsCard from "@/components/feature-details-card";
import Link from "next/link";

export default function FeatureRequestDisplay() {
  const { featureRequest } = useFeatureRequestDisplay();

  return (
    <div className="">
      <div className="flex items-center border-b mb-4 p-4">
        <Link href="/">
          <Button variant="default" size="default">
            <ArrowLeft />
            <span className="">Go Back</span>
          </Button>
        </Link>

        <h2 className="ml-4 text-3xl font-semibold">Feature Details</h2>
      </div>

      <FeatureDetailsCard featureRequest={featureRequest} />
    </div>
  );
}
