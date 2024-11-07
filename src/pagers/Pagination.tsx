import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FC, useMemo } from "react";

interface PaginationProps {
  totalPage: number;
  page: string;
  per_page: string;
  sort: string;
  createQueryString: (params: Record<string, string | number | null>) => string;
  router: AppRouterInstance;
  pathname: string;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

const Pagination: FC<PaginationProps> = ({
  totalPage,
  sort,
  isPending,
  page,
  per_page,
  startTransition,
  router,
  pathname,
  createQueryString,
}) => {
  const paginationRange = useMemo(() => {
    const range = [];
    const delta = 3;

    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(totalPage - 1, Number(page) + delta);
      i++
    ) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }
    if (Number(page) + delta < totalPage - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPage !== 1) {
      range.push(totalPage);
    }
    return range;
  }, [page, totalPage]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={Number(page) === 1 || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                sort,
                page: 1,
                per_page,
              })}`,
            );
          });
        }}
      >
        <Icons.chevronsLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={Number(page) === 1 || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                sort,
                page: Number(page) - 1,
                per_page,
              })}`,
            );
          });
        }}
      >
        <Icons.chevronLeft className="w-5 h-5" />
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={Number(page) === pageNumber ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    page: pageNumber,
                    per_page: per_page ?? null,
                    sort,
                  })}`,
                );
              });
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        ),
      )}{" "}
      <Button
        variant="outline"
        size="icon"
        disabled={Number(page) === Number(totalPage) || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                sort,
                page: Number(page) + 1,
                per_page,
              })}`,
            );
          });
        }}
      >
        <Icons.chevronRight className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={Number(page) === Number(totalPage) || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                sort,
                page: Number(totalPage),
                per_page,
              })}`,
            );
          });
        }}
      >
        <Icons.chevronsRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
