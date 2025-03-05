import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Calendar, Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Idea } from "@/types/commons";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import useVoteMap from "@/app/useVoteMap";

const priorityColors: { [key: string]: string } = {
  High: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  Medium:
    "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  Low: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toString().slice(0, -40) + ", " + dateObj.toLocaleTimeString();
};

export default function FeatureDetailsCard({
  featureRequest,
}: {
  featureRequest: Idea;
}) {
  const { voteMap, voteAnIdea } = useVoteMap();

  if (!featureRequest) {
    return <Loader />;
  }

  return (
    <Card className="overflow-hidden shadow-lg border m-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
              {featureRequest.title}
            </h3>
            <Badge
              variant="outline"
              className={priorityColors[featureRequest.priority]}
            >
              {featureRequest.priority} Priority
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span
                className={cn("text-sm font-medium cursor-pointer", {
                  "fill-green-600": voteMap?.[featureRequest.id]?.upvoted,
                })}
              >
                <ThumbsUp
                  className="w-5 h-5 text-green-600"
                  onClick={() => {
                    voteAnIdea(featureRequest, true, false);
                  }}
                  fill={
                    voteMap?.[featureRequest.id]?.upvoted
                      ? "fill-green-600"
                      : "transparent"
                  }
                />
              </span>

              <span className="text-sm text-gray-800">
                {featureRequest.upvotes +
                  (voteMap?.[featureRequest.id]?.upvoted ? 1 : 0)}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <span
                className={cn("text-sm font-medium cursor-pointer", {
                  "fill-red-600": voteMap?.[featureRequest.id]?.downvoted,
                })}
              >
                <ThumbsDown
                  className="w-5 h-5 text-red-600"
                  onClick={() => {
                    voteAnIdea(featureRequest, false, true);
                  }}
                  fill={
                    voteMap?.[featureRequest.id]?.downvoted
                      ? "fill-red-600"
                      : "transparent"
                  }
                />
              </span>

              <span className="text-sm text-gray-800">
                {featureRequest.downvotes +
                  (voteMap?.[featureRequest?.id]?.downvoted ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-foreground">{featureRequest.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pt-4">
        <div className="flex w-full flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={featureRequest.author.profileImage}
                alt={featureRequest.author.id}
              />
              <AvatarFallback>{featureRequest.author.name}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {featureRequest.author.name}
            </span>
          </div>

          <div className="flex flex-col space-y-1 text-xs text-muted-foreground ">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>
                Created:&nbsp;&nbsp;{formatDate(featureRequest.createdAt)}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>Updated:&nbsp;{formatDate(featureRequest.updatedAt)}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
