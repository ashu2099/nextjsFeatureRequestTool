"use client";

import { FeatureRequest } from "@/types/commons";

import ProductRow from "@/components/product-row";
import Paginator from "@/components/paginator";
import useHome from "./useHome";

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
      <h1 className="p-4 border-gray-200 border-b">Ideas</h1>

      <div className="w-full mx-auto">
        {data?.paginatedIdeas?.length > 0 &&
          data?.paginatedIdeas?.map((request: FeatureRequest) => (
            <ProductRow
              key={request.id}
              request={request}
              voteMap={voteMap}
              voteAnIdea={voteAnIdea}
              deleteFeatureRequest={deleteFeatureRequest}
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
