import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps {
  count: number;
}

export const DataTablePagination = ({ count }: DataTablePaginationProps) => {
  const defaultPageSize = 10;
  const pageSizeOptions = [10, 20, 30, 40, 50];
  const router = useRouter();
  const searchParams = useSearchParams();

  const parseNumericParam = (
    param: string | null,
    defaultValue: number
  ): number => {
    if (param === null) return defaultValue;
    const parsed = Number(param);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const currentPage = parseNumericParam(searchParams.get("pageNumber"), 1);
  const pageSize = parseNumericParam(
    searchParams.get("pageSize"),
    defaultPageSize
  );
  const numberOfPages = Math.max(Math.ceil(count / pageSize), 1);

  if (currentPage < 1 || pageSize < 1) {
    router.replace(`?pageNumber=1&pageSize=${defaultPageSize}`);
    return null;
  }

  if (currentPage > numberOfPages) {
    router.replace(`?pageNumber=${numberOfPages}&pageSize=${pageSize}`);
    return null;
  }

  const changePageSize = (size: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("pageSize", size.toString());
    newSearchParams.set("pageNumber", "1");
    router.push(`?${newSearchParams.toString()}`);
  };

  const navigateToPage = (param: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("pageNumber", param.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  const canNotGoToPreviousPage = (): boolean => {
    return currentPage === 1 || count < pageSize;
  };

  const canNotGoToNextPage = (): boolean => currentPage >= numberOfPages;

  return (
    <div className="flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Items per page
          </p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              changePageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {currentPage} of {numberOfPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            className="btn-custom size-8 p-0 flex"
            onClick={() => navigateToPage(1)}
            disabled={canNotGoToPreviousPage()}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            className="btn-custom size-8 p-0 flex"
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={canNotGoToPreviousPage()}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            className="btn-custom size-8 p-0 flex"
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={canNotGoToNextPage()}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            className="btn-custom size-8 p-0 flex"
            onClick={() => navigateToPage(numberOfPages)}
            disabled={canNotGoToNextPage()}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
