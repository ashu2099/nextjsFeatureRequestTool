import { deleteIdea, fetchFeatureRequests } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useHome(rowsPerPage: number) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const jumpToPage = (page: number) => {
    if (page >= 1 && page <= data?.totalPages) {
      setCurrentPage(page);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < data?.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ideas", currentPage, rowsPerPage],
    queryFn: fetchFeatureRequests,
  });

  const { mutate: deleteFeatureRequest } = useMutation({
    mutationFn: deleteIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const navigateToFeatureDetails = (featureId: string) => {
    router.push(`/feature-details/${featureId}`);
  };

  return {
    currentPage,
    jumpToPage,
    prevPage,
    nextPage,
    data,
    isLoading,
    isError,
    error,
    deleteFeatureRequest,
    navigateToFeatureDetails,
  };
}
