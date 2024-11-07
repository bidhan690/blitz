import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MainLogoProps {
  className?: string;
  imageClass?: string;
  textClass?: string;
}

const MainLogo: FC<MainLogoProps> = ({ className, imageClass, textClass }) => {
  return (
    <Link href="/">
      <div className={cn("p-2 flex items-center gap-x-2", className)}>
        <Image
          src="/icons/logo.svg"
          alt="logo"
          priority
          height={40}
          width={40}
          className={cn("h-[35px] w-[35px]", imageClass)}
        />
        <h2
          className={cn(
            "h-[35px] text-[#f86f03] text-[28px] font-jua ",
            textClass
          )}
        >
          {siteConfig.name}
        </h2>
      </div>
    </Link>
  );
};

export default MainLogo;
