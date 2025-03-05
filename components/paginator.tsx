import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { Input } from "./ui/input";

type PaginatorType = {
  total: number;
  currentPage: number;
  maxPages: number;
  jumpToPageCb: (_: number) => void;
  prevPageCb: () => void;
  nextPageCb: () => void;
};

const Paginator = ({
  total,
  currentPage,
  maxPages,
  jumpToPageCb,
  prevPageCb,
  nextPageCb,
}: PaginatorType) => {
  useEffect(() => {
    setJumpInput(currentPage);
  }, [currentPage]);

  const [jumpInput, setJumpInput] = useState(0);

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
            if (parseInt(e.target.value)) {
              setJumpInput(parseInt(e.target.value));
            }
          }}
        />

        <div className="whitespace-nowrap"> of {maxPages}</div>

        <Button
          size="sm"
          className="ml-2"
          onClick={() => {
            jumpToPageCb(jumpInput);
          }}
        >
          Jump
        </Button>
      </div>

      <div className="flex items-center justify-center min-w-32">
        Total {total} Records
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={prevPageCb} disabled={currentPage === 1}>
          Previous
        </Button>

        <Button
          size="sm"
          onClick={nextPageCb}
          disabled={currentPage >= maxPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Paginator;
