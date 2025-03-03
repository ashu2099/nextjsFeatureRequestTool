import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { RowsPerPage } from "./rows-per-page";

const Paginator = () => {
  const {
    loading,
    error,
    fetchProducts,
    setNewRecordPerPage,
    nextPage,
    prevPage,
    goToPage,
    currentPage,
    total,
    limit,
  } = useAppStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setJumpInput(currentPage);
  }, [currentPage]);

  const [jumpInput, setJumpInput] = useState();

  const maxPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-gray-500 w-32 h-32 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-2 items-center justify-center md:justify-between space-x-2 py-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <div className="mr-2">Page:</div>
        <Input
          className="w-24"
          type="number"
          min="1"
          max={maxPages}
          value={jumpInput}
          onChange={(e) => {
            setJumpInput(e.target.value);
          }}
        />

        <div className="whitespace-nowrap"> of {maxPages}</div>

        <Button
          size="sm"
          className="ml-2"
          onClick={() => {
            goToPage(jumpInput);
          }}
        >
          Jump
        </Button>
      </div>

      <div className="w-48">
        <RowsPerPage
          rowsPerPageChange={setNewRecordPerPage}
          rowsPerPageValue={limit}
        />
      </div>

      <div className="flex items-center justify-center min-w-32">
        Total {total} Records
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>

        <Button
          size="sm"
          onClick={nextPage}
          disabled={currentPage === maxPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
