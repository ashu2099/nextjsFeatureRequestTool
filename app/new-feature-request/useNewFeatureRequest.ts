import { addIdea, fetchItems } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useNewFeatureRequest() {
  const queryClient = useQueryClient();

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchItems,
  });

  const { mutate: addFeatureRequest } = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  return { employees, addFeatureRequest };
}
