"use client";
import * as React from "react";
import Image from "next/image";
import useEmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from "embla-carousel-react";
import { catchError, cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Product } from "@prisma/client";
import Link from "next/link";
import { addToCartAction } from "@/_actions/cart";
import { toast } from "sonner";

interface ProductImageCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
  options?: EmblaOptionsType;
}

export default function MainProductImageCarousel({
  products,
  className,
  options,
  ...props
}: ProductImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const scrollPrev = React.useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    },
    [scrollNext, scrollPrev],
  );

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div
      aria-label="Product image carousel"
      className={cn(
        "relative h-72 w-full md:w-[700px] flex justify-center rounded-xl",
        className,
      )}
      {...props}
    >
      <Button
        onClick={() => scrollPrev()}
        variant="outline"
        size="icon"
        className={cn("hidden rounded-full absolute top-1/2 left-0", {})}
      >
        <Icons.chevronLeft className="w-4 h-4 stroke-black" />
      </Button>
      <div
        ref={emblaRef}
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        className="w-[300px] md:w-[650px] px-2 flex overflow-hidden items-center "
      >
        <div
          className="w-full gap-x-2 -ml-4 flex items-center touch-pan-y"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              imageUrl={product.images[0]}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
      <Button
        onClick={() => scrollNext()}
        variant="outline"
        size="icon"
        className={cn("hidden md:flex rounded-full absolute top-1/2 right-0", {
          hidden: nextBtnDisabled,
        })}
      >
        <Icons.chevronRight className="w-4 h-4 stroke-black" />
      </Button>
    </div>
  );
}

interface ProductItemProps {
  imageUrl?: string;
  title?: string;
  price?: number;
  rating?: number;
  id: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  imageUrl,
  title,
  price,
  rating,
  id,
}) => {
  const [isPending, startTransition] = React.useTransition();
  return (
    <Link href={`/product/${id}`}>
      <div className=" flex justify-around flex-col gap-y-1 w-48 h-60 shrink-0 bg-white rounded-2xl shadow-all">
        <div className="flex justify-center items-center overflow-hidden">
          <Image
            src={imageUrl ?? "/icons/headphone.png"}
            alt="Product image"
            width={150}
            height={150}
            className="w-full h-32 object-cover"
          />
        </div>
        <div className="p-3 flex justify-around flex-col gap-y-1">
          <h2 className="">{title ?? "Original Beats Solo Pro"}</h2>
          <p className="text-sm text-gray-500">
            {formatPrice(Number(price)) ?? "$333.20"}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              {rating === 0 ? (
                <Icons.star className="w-4 h-4 fill-[#00E0C6] text-[#00e0c6]" />
              ) : (
                Array.from({ length: rating ?? 1 }).map((_, i) => (
                  <Icons.star
                    key={i}
                    className="w-4 h-4 fill-[#00E0C6] text-[#00e0c6]"
                  />
                ))
              )}
              <h2 className="text-sm text-[#00E0C6]">{rating ?? "4.5"}</h2>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-7 h-7 bg-[#009393] hover:bg-[#00E0C6]"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                startTransition(async () => {
                  try {
                    const res = await addToCartAction({
                      productId: id,
                      quantity: 1,
                    });
                    if (res?.error) throw new Error(res?.error);

                    toast.success("Successfully added to cart");
                  } catch (err: unknown) {
                    catchError(err);
                  }
                });
              }}
            >
              {isPending ? (
                <Icons.spinner className="animate-spin w-4 h-4 stroke-white" />
              ) : (
                <Icons.add className="fill-white w-4 h-4 stroke-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
