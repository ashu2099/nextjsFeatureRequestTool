"use client";

import FeatureForm from "@/components/feature-form";
import useNewFeatureRequest from "./useNewFeatureRequest";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import FeatureRequestUpdateDialogue from "@/components/success-dialogue";

export default function NewFeatureRequest() {
  const { employees, addFeatureRequest, isModalOpen, handleUserInteraction } =
    useNewFeatureRequest();

  return (
    <div className="">
      <div className="flex items-center border-b mb-4 p-4">
        <Link href="/">
          <Button variant="default" size="default">
            <ArrowLeft />
            <span className="">Go Back</span>
          </Button>
        </Link>

        <h2 className="ml-4 text-3xl font-semibold">Add A New Feature</h2>
      </div>

      <div className="p-4">
        <FeatureForm employees={employees} formSubmitCb={addFeatureRequest} />
      </div>

      <FeatureRequestUpdateDialogue
        isOpen={isModalOpen}
        interactionCallback={handleUserInteraction}
      />
    </div>
  );
}
