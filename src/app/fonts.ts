import { Inter, Jua, Poppins } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const jua = Jua({
  weight: "400",
  variable: "--font-jua",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  weight: "600",
});
