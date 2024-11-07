"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";

interface QuantityCounterProps {
  setTotalQuantity: (quantity: number) => void;
  maxQuantity?: number;
}

const QuantityCounter: FC<QuantityCounterProps> = ({ setTotalQuantity, maxQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTotalQuantity(quantity)

    return () => {
      setTotalQuantity(1)
    }
  }, [quantity, setTotalQuantity])

  const handleQuantity = (type: string) => {
    if (type === "increment") {
      if (quantity < maxQuantity! ?? 9) {
        setQuantity((q) => q + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity((q) => q - 1);
      }
    }
  };

  return (
    <div className="w-28 h-10 p-2 flex items-center justify-between border rounded-lg">
      <Button
        variant="ghost"
        className="w-6 h-6 bg-white "
        size="icon"
        onClick={() => handleQuantity("decrement")}
      >
        <Icons.remove name="minus" className="w-6 h-6 text-gray-700 " />
      </Button>
      <h2 className="text-gray-700">{quantity}</h2>
      <Button
        variant="ghost"
        className="w-6 h-6 bg-white "
        size="icon"
        onClick={() => handleQuantity("increment")}
      >
        <Icons.add name="plus" className="w-6 h-6  text-gray-700 " />
      </Button>
    </div>
  );
};

export default QuantityCounter;
