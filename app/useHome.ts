import { FeatureRequest, VoteCollection } from "@/types/commons";
import { deleteIdea, fetchFeatureRequests } from "@/utils/api";
import { getVoteMap, updateVoteMap } from "@/utils/votes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useHome(rowsPerPage: number) {
  const queryClient = useQueryClient();

  const [voteMap, setVoteMap] = useState<VoteCollection>({});

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

  const voteAnIdea = (...args: (boolean | FeatureRequest)[]) => {
    updateVoteMap(...args);
    setVoteMap(getVoteMap());
  };

  useEffect(() => {
    setVoteMap(getVoteMap());
  }, []);

  return {
    currentPage,
    jumpToPage,
    prevPage,
    nextPage,
    voteMap,
    data,
    isLoading,
    isError,
    error,
    deleteFeatureRequest,
    voteAnIdea,
  };
}
