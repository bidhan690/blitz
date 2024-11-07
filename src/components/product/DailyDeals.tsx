import { ArrowRight } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";

interface DailyDealsProps {
  products: Product[];
}

const DailyDeals: FC<DailyDealsProps> = ({ products }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-cyan-800 text-2xl font-semibold">Daily Deals</h2>
        <Button variant="ghost" asChild>
          <Link href="/products" className="flex items-center gap-1">
            <h4 className="text-zinc-600 text-sm font-medium">View all</h4>
            <ArrowRight className="text-zinc-600" size={16} />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col p-3 gap-y-5">
        {products.map((product) => (
          <DealsItem
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            rating={product.rating}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyDeals;

interface DealsItemProps {
  title: string;
  imageUrl: string;
  id: string;
  price?: number;
  rating: number
  reviewCount?: number;
  orderCount?: number;
}
export const DealsItem: FC<DealsItemProps> = ({
  title,
  imageUrl,
  id,
  price,
  rating,
  reviewCount,
  orderCount,
}) => {
  return (
    <Link href={`/product/${id}`}>
      <div className=" flex gap-x-6">
        <Image
          src={imageUrl ?? "/images/blue-headphone.png"}
          alt="Product"
          width={30}
          height={40}
          className="w-7 h-10 object-cover"
        />
        <div className="flex flex-col gap-y-1">
          <div className="h-5 flex gap-x-2 items-center">
            <h4 className="w-48 truncate text-sm font-medium ">
              {title ?? "beats new studio blue headset"}
            </h4>
            <h3 className=" text-gray-700 text-xs font-medium">
              Price {formatPrice(price ?? 1000)}
            </h3>
          </div>
          <h3 className="w-36 text-gray-700 text-xs font-medium">
            {rating ?? 256} Rating 
          </h3>
        </div>
      </div>
    </Link>
  );
};
