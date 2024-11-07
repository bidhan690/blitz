import { Cart_Item } from "@/types";
import { FC } from "react";
import Image from "next/image";
import { Icons } from "../icons";
import { cn, formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
import UpdateCart from "./update-cart";
import { Button } from "../ui/button";

interface cartItemsProps {
  items: Cart_Item[];
  className?: string;
}

const CartItems: FC<cartItemsProps> = ({ items, className }) => {
  return items.map((item) => {
    const product = item.product;
    return (
      <>
        <div key={item.id} className={cn("flex justify-between items-center")}>
          <div className="flex space-x-4">
            <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
              {product.images?.length ? (
                <Image
                  src={product.images[0] ?? "/images/product-placeholder.webp"}
                  alt={product.images[0] ?? product.name}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="absolute object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary">
                  <Icons.placeholder
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <h4 className="text-sm">{product.name}</h4>
              <p className="text-xs text-muted-foreground">
                {`${formatPrice(product.price)} x ${item.quantity} = ${
                  item.quantity * product.price
                }`}
              </p>
            </div>
          </div>

          <UpdateCart
            itemId={item.id}
            productId={item.productId}
            quantity={item.quantity}
          />
        </div>
        <Separator className="my-2" />
      </>
    );
  });
};

export default CartItems;
