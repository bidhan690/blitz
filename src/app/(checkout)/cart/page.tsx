import { getCartAction } from "@/_actions/cart";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shells/shell";
import { FC } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import CartItems from "@/components/checkout/cart-items";
import EsewaPayment from "./EsewaPayment";
import CartItemSelector from "./CartItemSelector";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const cart = await getCartAction();
  const cartItems = cart?.items ?? [];

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);

  return (
    <Shell>
      <PageHeader aria-labelledby="checkout-page-header">
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Select the items you want to order
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex justify-between gap-2">
        <div className="w-full">
          {cartItems.length === 0 ? (
            <div className="h-screen flex flex-col justify-center items-center ">
          <Icons.cart className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Your cart is empty</h3>
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
        </div>
        ) : (
          <CartItemSelector items={cartItems} />
          )}
        </div>
      </div>
    </Shell>
  );
};

export default page;
