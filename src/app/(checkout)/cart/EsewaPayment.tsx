"use client";
import { Button } from "@/components/ui/button";
import { esewaClient } from "@/lib/esewaHelper";
import { FC } from "react";

interface EsewaPaymentProps {
  amount: number;
  deliveryCharge?: number;
  taxAmount?: number;
  serviceCharge?: number;
}

const EsewaPayment: FC<EsewaPaymentProps> = ({
  amount,
  deliveryCharge = 0,
  taxAmount = 0,
  serviceCharge = 0,
}) => {
  return (
    <Button
      size="lg"
      className="w-full"
      disabled={amount === 0}
      onClick={() => {
        esewaClient.init({
          amount: amount,
          taxAmount,
          deliveryCharge,
          serviceCharge,
        });
      }}
    >
      Pay with Esewa
    </Button>
  );
};

export default EsewaPayment;
