import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../icons";
import { getCartAction } from "@/_actions/cart";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Link from "next/link";
import CartItems from "../checkout/cart-items";
import { ScrollArea } from "../ui/scroll-area";

interface cartSheetProps { }

const CartSheet: FC<cartSheetProps> = async ({ }) => {
  const cart = await getCartAction();
  const cartItems = cart?.items ?? [];

  const count = cartItems.reduce((total, item) => total + Number(item.quantity), 0)

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity)
  }, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="p-1 relative">
          {count > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
            >
              {count}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col space-y-2">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <Separator className="" />
        {cartItems.length ? (
          <>
            <ScrollArea className="h-[calc(100vh-10%)]  flex flex-col space-y-3">
              <CartItems items={cartItems} />
            </ScrollArea>
            <Separator />
            <div className="flex flex-col space-y-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  aria-label="View your cart"
                  href="/cart"
                  className={buttonVariants({
                    size: "sm",
                    className: "w-full",
                  })}
                >
                  Continue to checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>

          </>
        ) : (
          <div className="h-full flex flex-col space-y-1 justify-center items-center">
            <Icons.cart className="h-16 w-16" />
            <h2 className="text-lg font-sans text-muted-foreground">Your cart is empty</h2>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                href="/products"
                className={cn(
                  buttonVariants({
                    variant: "link",
                    size: "sm",
                    className: "text-sm text-muted-foreground",
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}


      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;



