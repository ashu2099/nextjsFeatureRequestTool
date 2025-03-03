"use client";

const VOTES_STORAGE_KEY = "VOTE_MAP";

export const getVoteMap = () => {
  return JSON.parse(localStorage.getItem(VOTES_STORAGE_KEY)) || {};
};

export const updateVoteMap = (idea, upvoted, downvoted) => {
  const storedVotes = JSON.parse(localStorage.getItem(VOTES_STORAGE_KEY)) || {};

  if (storedVotes?.[idea.id]?.upvoted === true && upvoted == true) {
    upvoted = false;
  }

  if (storedVotes?.[idea.id]?.downvoted === true && downvoted == true) {
    downvoted = false;
  }

  storedVotes[idea?.id] = { upvoted, downvoted };

  localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(storedVotes));
};
