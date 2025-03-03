"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteIdea, fetchItems } from "@/utils/api";

import { getVoteMap, updateVoteMap } from "@/utils/votes";

import { ThumbsUp, ThumbsDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FeatureRequest, VoteCollection } from "@/types/commons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchItems,
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

  const [voteMap, setVoteMap] = useState<VoteCollection>({});

  useEffect(() => {
    setVoteMap(getVoteMap());
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="p-4 border-gray-200 border-b">Ideas</h1>

      <div className="w-full mx-auto">
        {data.length > 0 &&
          data.map((request: FeatureRequest) => (
            <div
              key={request.id}
              className="flex justify-between items-center bg-white p-6 border-b border-gray-200 hover:bg-gray-100 transition-shadow duration-200"
            >
              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.title}
                </h3>

                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="font-medium">Pitched by: </span>

                  <Image
                    src={request?.author?.profileImage}
                    width={24}
                    height={24}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />

                  <span>{request?.author?.name}</span>
                </div>

                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="font-medium">Priority: </span>

                  <span>{request?.priority}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 select-none">
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn("text-sm font-medium cursor-pointer", {
                          "fill-green-600": voteMap?.[request.id]?.upvoted,
                        })}
                      >
                        <ThumbsUp
                          className="w-5 h-5 text-green-600"
                          onClick={() => {
                            voteAnIdea(request, true, false);
                          }}
                          fill={
                            voteMap?.[request.id]?.upvoted
                              ? "fill-green-600"
                              : "transparent"
                          }
                        />
                      </span>
                      <span className="text-sm text-gray-800">
                        {request.upvotes +
                          (voteMap?.[request.id]?.upvoted ? 1 : 0)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={cn("text-sm font-medium cursor-pointer", {
                          "fill-red-600": voteMap?.[request.id]?.downvoted,
                        })}
                      >
                        <ThumbsDown
                          className="w-5 h-5 text-red-600"
                          onClick={() => {
                            voteAnIdea(request, false, true);
                          }}
                          fill={
                            voteMap?.[request.id]?.downvoted
                              ? "fill-red-600"
                              : "transparent"
                          }
                        />
                      </span>
                      <span className="text-sm text-gray-800">
                        {request.downvotes +
                          (voteMap?.[request?.id]?.downvoted ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteFeatureRequest(request.id)}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
