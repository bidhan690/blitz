"use client";
import { deleteCartItemAction } from "@/_actions/cart";
import CheckoutCard from "@/components/cards/checkout-card";
import UpdateCart from "@/components/checkout/update-cart";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatPrice } from "@/lib/utils";
import { Cart_Item } from "@/types";
import { Cart } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";

interface CartItemSelectorProps {
  items: Cart_Item[];
}

const CartItemSelector: FC<CartItemSelectorProps> = ({ items }) => {
  const [isPending, startTransition] = useTransition();
  const totalCount = items.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );

  const [selectedItems, setSelectedItems] = useState<Cart_Item[] | null>([]);

  const deleteItem = () => {
    const itemsId = selectedItems?.map((item) => item.id);
    startTransition(async () => {
      await deleteCartItemAction(itemsId ?? []);
      setSelectedItems((prev) =>
        prev!.filter((item) => !itemsId?.includes(item.id)),
      );
    });
  };

  useEffect(() => {
        const itemsId = selectedItems?.map((item) => item.id);

     setSelectedItems((prev) =>
        prev!.filter((item) => itemsId?.includes(item.id)),
      );
  }, [items]);

  return (
    <div className="flex gap-6 justify-between flex-col md:flex-row">
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Checkbox
              id="select-all"
              checked={selectedItems?.length === items.length}
              onCheckedChange={(checked) =>
                checked ? setSelectedItems(items) : setSelectedItems([])
              }
            />
            <span className="text-xs">SELECT ALL ({totalCount}) ITEMS</span>
          </div>
          <Button disabled={isPending} className="text-xs" onClick={deleteItem}>
            {isPending ? (
              <Icons.spinner className="animate-spin w-4 h-4 mr-2" />
            ) : (
              <Icons.trash className="w-4 h-4 mr-2" />
            )}
            DELETE
          </Button>
        </div>
        <div className="w-full p-2 border border-muted-foreground rounded-md flex flex-col gap-2">
          {items.map((item, i) => (
            <SelectorItem
              key={i}
              item={item}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ))}
        </div>
      </div>
      <CheckoutCard items={selectedItems} totalItem={totalCount} />
    </div>
  );
};

export default CartItemSelector;

interface SelectorItemProps {
  item: Cart_Item;
  selectedItems: Cart_Item[] | null;
  setSelectedItems: Dispatch<SetStateAction<Cart_Item[] | null>>;
}

const SelectorItem: FC<SelectorItemProps> = ({
  item,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <div className=" flex items-center gap-3">
      <Checkbox
        id={item.id}
        checked={selectedItems?.map((item) => item.id).includes(item.id)}
        onCheckedChange={(checked) => {
          return checked
            ? setSelectedItems((prev) => [...prev!, item])
            : setSelectedItems((prev) => prev!.filter((i) => i.id !== item.id));
        }}
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {item.product.images?.length ? (
              <Image
                src={
                  item.product.images[0] ?? "/images/product-placeholder.webp"
                }
                alt={item.product.images[0] ?? item.product.name}
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
            <h4 className="text-sm">{item.product.name}</h4>
            <p className="text-xs text-muted-foreground">
              {`${formatPrice(item.product.price)} x ${item.quantity} = ${
                item.quantity * item.product.price
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
    </div>
  );
};
