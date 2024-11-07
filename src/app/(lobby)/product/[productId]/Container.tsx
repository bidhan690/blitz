"use client";
import { Icons } from "@/components/icons";
import { FC, Fragment, useState, useTransition } from "react";
import { Balancer } from "react-wrap-balancer";
import QuantityCounter from "./QuantityCounter";
import { catchError, cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import { addToCartAction } from "@/_actions/cart";
import { toast } from "sonner";

interface ContainerProps {
  product: Product;
}

const Container: FC<ContainerProps> = ({ product }) => {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-black">
        <Balancer>{product.name}</Balancer>
      </h1>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          {product.rating > 0
            ? Array.from({ length: product.rating }).map((_, i) => (
                <Icons.star key={i} size={18} fill="orange" color="orange" />
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <Icons.star key={i} size={18} fill="gray" color="gray" />
              ))}

          <h2 className="font-medium flex items-center">
            {product.rating} Rating
          </h2>
        </div>
        <div className="flex gap-1.5 items-center">
          <Icons.verified className="w-5 h-5" />
          <h2>
            {product.quantity === 0
              ? "Out of stock"
              : `In Stock (${product.quantity})`}
          </h2>
        </div>
      </div>
      <h2 className="w-full lg:w-96 text-gray-500 text-sm font-medium leading-normal">
        <Balancer>{product.description}</Balancer>
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3>Quantity</h3>
          <QuantityCounter
            setTotalQuantity={setQuantity}
            maxQuantity={product.quantity}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-black font-semibold text-2xl">
            {formatPrice(
              quantity > 1 ? product.price * quantity : product.price,
            )}
          </h2>
          <h4 className="text-sm text-gray-700 font-medium">+12% VAT Added</h4>
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "text-white hover:text-white bg-orange-500 hover:bg-orange-500/80",
          {},
        )}
        onClick={() => {
          startTransition(async () => {
            try {
              const res = await addToCartAction({
                productId: product.id ?? "",
                quantity,
              });
              if (res?.error) throw new Error(res.error);
              toast.success("Successfully added to cart");
            } catch (err: unknown) {
              catchError(err);
            }
          });
        }}
      >
        {isPending ? (
          <Icons.spinner className="w-5 h-5 animate-spin" />
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  );
};

export default Container;
