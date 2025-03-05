"use client";

import { Idea } from "@/types/commons";

import ProductRow from "@/components/product-row";
import Paginator from "@/components/paginator";
import useHome from "./useHome";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ROWS_PER_PAGE = 10;

export default function Home() {
  const {
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
    navigateToFeatureDetails,
  } = useHome(ROWS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-gray-500 w-32 h-32 border-b-2"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <div className="p-4 flex justify-between items-center border-gray-200 border-b">
        <h1 className="  ">Ideas</h1>
        <Link href="new-feature-request">
          <Button className="cursor-pointer" variant="default" size="sm">
            Add New Feature Request
          </Button>
        </Link>
      </div>

      <div className="w-full mx-auto">
        {data?.paginatedIdeas?.length > 0 &&
          data?.paginatedIdeas?.map((request: Idea) => (
            <ProductRow
              key={request.id}
              request={request}
              voteMap={voteMap}
              voteAnIdea={voteAnIdea}
              deleteFeatureRequest={deleteFeatureRequest}
              ideaClicked={navigateToFeatureDetails}
            />
          ))}
      </div>

      <div className="p-4">
        <Paginator
          total={data?.totalItems}
          currentPage={currentPage}
          maxPages={data?.totalPages}
          jumpToPageCb={jumpToPage}
          prevPageCb={prevPage}
          nextPageCb={nextPage}
        />
      </div>
    </div>
  );
}
