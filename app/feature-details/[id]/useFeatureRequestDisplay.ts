import { fetchFeatureRequestsById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useFeatureRequestDisplay() {
  const params = useParams();

  const { data: featureRequest } = useQuery({
    queryKey: ["ideas", params.id],
    queryFn: () => fetchFeatureRequestsById(params.id),
    enabled: Boolean(params?.id),
  });

  return { featureRequest };
}
