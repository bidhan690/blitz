"use client";
import { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { deleteCartItemAction, updateCartItemAction } from "@/_actions/cart";
import { catchError } from "@/lib/utils";

interface updateCartProps {
  quantity: number;
  itemId: string;
  productId: string;
}

const UpdateCart: FC<updateCartProps> = ({ itemId, productId, quantity }) => {
  const [isPending, startTransition] = useTransition();

  const updateCartAction = async (type: "inc" | "dec" | "delete") => {
    switch (type) {
      case "inc":
        startTransition(async () => {
          try {
            const res = await updateCartItemAction({
              productId,
              quantity: quantity + 1,
            });
            if (res?.error) throw new Error(res?.error);
          } catch (error) {
            catchError(error);
          }
        });
        break;
      case "dec":
        startTransition(async () => {
          if (quantity === 1) {
            await deleteCartItemAction([itemId]);
            return;
          }
          try {
            const res = await updateCartItemAction({
              productId,
              quantity: quantity - 1,
            });
            if (res?.error) throw new Error(res?.error);
          } catch (error) {
            catchError(error);
          }
        });
        break;
      case "delete":
        startTransition(async () => {
          await deleteCartItemAction([itemId]);
        });
        break;
      default:
        return;
    }
  };
  return (
    <div className="flex items-center gap-x-2 px-1 mr-3">
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("inc")}
      >
        <Icons.add className="w-3 h-3" />
      </Button>
      <span className="text-muted-foreground text-sm">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("dec")}
      >
        <Icons.remove className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={isPending}
        onClick={() => updateCartAction("delete")}
      >
        <Icons.trash className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default UpdateCart;
