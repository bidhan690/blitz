import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Cart_Item } from "@/types";
import { formatPrice } from "@/lib/utils";
import EsewaPayment from "@/app/(checkout)/cart/EsewaPayment";

interface CheckoutCardProps {
  items: Cart_Item[] | null;
  totalItem: number;
}

const CheckoutCard: FC<CheckoutCardProps> = ({ items }) => {
  const totalCount = items?.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );
  const totalPrice = items?.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);
  return (
    <Card className="w-full md:w-80 lg:w-96  ">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 font-medium">
        <div className="flex justify-between">
          <span className="text-sm">Subtotal ({totalCount} items)</span>
          <span className="text-sm">{formatPrice(totalPrice ?? 0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Shipping Fee</span>
          <span className="text-sm">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Total</span>
          <span className="text-sm text-orange-600">
            {formatPrice(totalPrice ?? 0)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <EsewaPayment amount={totalPrice ?? 0} />
      </CardFooter>
    </Card>
  );
};

export default CheckoutCard;
