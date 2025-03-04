import { addIdea, fetchItems } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useNewFeatureRequest() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchItems,
  });

  const { mutate: addFeatureRequest } = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      setIsModalOpen(true);

      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserInteraction = (shouldNavigate: boolean) => {
    if (shouldNavigate) {
      router.push("/");
    } else {
      setIsModalOpen(false);
    }
  };

  return { employees, addFeatureRequest, isModalOpen, handleUserInteraction };
}
