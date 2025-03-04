"use client";

import FeatureForm from "@/components/feature-form";
import useNewFeatureRequest from "./useNewFeatureRequest";

export default function NewFeatureRequest() {
  const { employees, addFeatureRequest } = useNewFeatureRequest();

  return (
    <div className="">
      <h2 className="border-b text-3xl font-semibold mb-4 p-4">
        Add A New Feature
      </h2>

      <div className="p-4">
        <FeatureForm employees={employees} formSubmitCb={addFeatureRequest} />
      </div>
    </div>
  );
}
