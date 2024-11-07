"use client";

import { nanoid } from "nanoid";
// @ts-ignore
import CryptoJS from "crypto-js";

interface EsewaInitData {
  amount: number;
  taxAmount?: number;
  serviceCharge?: number;
  deliveryCharge?: number;
  productCode?: string;
  mode?: "development" | "production";
}

interface EsewaStatusData {
  transactionId: string;
  totalAmount: number;
  productCode?: string;
  mode?: "development" | "production";
}

export const esewaClient = {
  init: ({
    amount,
    taxAmount = 0,
    serviceCharge = 0,
    deliveryCharge = 0,
    productCode = "EPAYTEST",
    mode = "development",
  }: EsewaInitData) => {
    const esewaURL =
      mode === "development"
        ? "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        : "https://epay.esewa.com.np/api/epay/main/v2/form";
    const uuid = nanoid();
    const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;

    const secret = "8gBm/:&EnhH.1/q";
    const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=${productCode}`;

    const hash = CryptoJS.HmacSHA256(message, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    const formData = {
      amount,
      failure_url: "https://google.com",
      product_delivery_charge: deliveryCharge,
      product_service_charge: serviceCharge,
      product_code: productCode,
      signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "https://esewa.com.np",
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: uuid,
    };

    const form = document.createElement("form");
    form.action = esewaURL;
    form.method = "POST";
    form.target = "_blank";

    for (const key in formData) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      // @ts-ignore
      input.value = formData[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
    return uuid;
  },
  paymentStatus: async ({
    totalAmount,
    transactionId,
    mode = "development",
    productCode,
  }: EsewaStatusData) => {
    const url = `https://${
      mode === "development" ? "uat" : "epay"
    }/status/?product_code=${productCode}&total_amount=${totalAmount}&transaction_uuid=${transactionId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};
