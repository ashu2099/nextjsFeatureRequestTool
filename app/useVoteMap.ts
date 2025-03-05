import { Idea, VoteCollection } from "@/types/commons";
import { getVoteMap, updateVoteMap } from "@/utils/votes";
import { useEffect, useState } from "react";

export default function useVoteMap() {
  const [voteMap, setVoteMap] = useState<VoteCollection>({});

  const voteAnIdea = (...args: (boolean | Idea)[]) => {
    updateVoteMap(...args);
    setVoteMap(getVoteMap());
  };

  useEffect(() => {
    setVoteMap(getVoteMap());
  }, []);

  return {
    voteMap,
    voteAnIdea,
  };
}
