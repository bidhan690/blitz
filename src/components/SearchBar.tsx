"use client";
import Icon from "@/lib/DynamicIcon";
import { FC, useEffect, useCallback, useTransition, useState } from "react";
import { Input } from "./ui/input";
import { useSearchbar } from "@/hooks/useSearchbar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { filterProductsAction } from "@/_actions/product";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const router = useRouter();
  const searchModal = useSearchbar();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<any[] | null>([]);

  useEffect(() => {
    if (debouncedQuery.length === 0) setResults(null);
    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const data = await filterProductsAction(debouncedQuery);
        setResults(data);
        console.log(data);
      });
    }
  }, [debouncedQuery]);

  const toggleModal = useCallback(() => {
    searchModal.setIsOpen(!searchModal.isOpen);
  }, [searchModal]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleModal();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleModal]);

  useEffect(() => {
    if (searchModal.isOpen) {
      setQuery("");
    }
  }, [searchModal.isOpen]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={toggleModal}
      >
        <Icons.search
          name="search"
          className="h-4 w-4 xl:mr-2"
          aria-hidden="true"
        />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr>Ctrl+</abbr>K
        </kbd>
      </Button>
      <CommandDialog open={searchModal.isOpen} onOpenChange={toggleModal}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search products..."
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            results?.map((product) => (
              <CommandGroup
                className="capitalize"
                key={product.id}
                heading={product.subCategoryName}
              >
                <CommandItem
                  onSelect={() => {
                    toggleModal();
                    router.push(`/product/${product.id}`);
                  }}
                >
                  {product.name}
                </CommandItem>
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
