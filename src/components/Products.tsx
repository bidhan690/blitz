"use client";
import { FC, useCallback, useEffect, useState, useTransition } from "react";
import ProductCard from "./cards/product-card";
import { Option, Product } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, toTitleCase } from "@/lib/utils";
import Pagination from "@/pagers/Pagination";
import { getSubcategories, productsCategories, sortOptions } from "@/config/products";
import { useDebounce } from "@/hooks/useDebounce";

import FilterSheet from "./sheets/filter-sheet";

interface ProductsProps {
  products: Product[];
  pageCount: number;
  category?: string
  categories?: boolean
}

const Products: FC<ProductsProps> = ({ products, pageCount, categories = false, category }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [selectedCategories, setSelectedCategories] = useState<Option[] | null>(null)
  const [price, setPrice] = useState<[number, number]>([0, 100000])
  const debouncePrice = useDebounce(price, 500)
  const [selectedSubCategories, setSelectedSubCategories] = useState<Option[] | null>(null)
  const subCategories = getSubcategories(category)

  const sort = searchParams.get("sort") ?? "date.desc"
  const page = searchParams.get("page") ?? "1"
  const per_page = searchParams.get("per_page") ?? "8"

  const createQueryString = useCallback((params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString())
    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    }

    return newSearchParams.toString()
  }, [searchParams])

  useEffect(() => {
    const [min, max] = debouncePrice
    startTransition(() => {
      router.push(`${pathname}/?${createQueryString({
        price_range: `${min}-${max}`,
      })}`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePrice])

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}/?${createQueryString({
        categories: selectedCategories?.length ? selectedCategories.map(c => c.value.toLowerCase()).join(".") : null,
      })}`)
    })
      , { scroll: false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])

  useEffect(() => {
    startTransition(() => {
      router.push(`${pathname}/?${createQueryString({
        subcategories: selectedSubCategories?.length ? selectedSubCategories.map(c => c.value.toLowerCase()).join(".") : null,
      })}`)
    })
      , { scroll: false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubCategories])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-x-3">
        <FilterSheet
          isPending={isPending}
          category={category}
          categories={categories}
          subCategories={subCategories}
          price={price}
          setPrice={setPrice}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={isPending}>Sort <Icons.chevronDown className="ml-2 w-4 h-4" /> </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((item, i) => (
              <DropdownMenuItem key={i} className={cn(sort === item.value && "font-bold")} onClick={() => {
                startTransition(() => {
                  router.push(`${pathname}?${createQueryString({ sort: item.value })}`, { scroll: false })
                })
              }}>{item.label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {products.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>)
        : (
          <div className="flex flex-col gap-y-2 items-center justify-center py-8">
            <Icons.cart className="w-8 h-8 text-gray-800" />
            <h1 className=" text-2xl font-semibold">No products found</h1>
            <p className="text-base text-gray-700">Try changing your filters, or check back later for new products.</p>
          </div>
        )}
      {products.length ? (
        <Pagination sort={sort} createQueryString={createQueryString} totalPage={pageCount} page={page} per_page={per_page} router={router} pathname={pathname} isPending={isPending} startTransition={startTransition} />
      ) : null}
    </div>
  );
};

export default Products;
