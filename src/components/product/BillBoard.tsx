import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BillBoardProps { }

const BillBoard: FC<BillBoardProps> = ({ }) => {
  return (
    <Link href="/categories/electronics/headphones">
      <div className=" w-96 h-56 p-2 rounded-2xl overflow-hidden">
        <Image
          width={390}
          height={230}
          quality={100}
          src="/images/billboard.png"
          alt="BillBoard Image"
          className="rounded-2xl object-cover"
        />
      </div>
    </Link>
  );
};

export default BillBoard;
