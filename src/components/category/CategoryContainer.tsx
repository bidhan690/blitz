import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategoryContainerProps { }

const CategoryContainer: FC<CategoryContainerProps> = ({ }) => {
  return (
    <div className="m-2 flex flex-col gap-y-3 items-center">
      <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-800 leading-10 font-inter ">
        Shop By Category
      </h2>
      <p className="text-sm text-center text-gray-600 font-medium font-inter">
        Explore our categories and find the best products for you
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CategoryItem
          title="Watch"
          href="watches"
          imageUrl="/images/black-watch.jpeg"
        />

        <CategoryItem
          title="Clothes"
          href="clothing"
          imageUrl="/images/clothes.jpeg"
        />

        <CategoryItem
          title="Shoes"
          href="shoes"
          imageUrl="/images/shoes.jpeg"
        />

        <CategoryItem
          title="Electronics"
          href="electronics"
          imageUrl="/images/electronics.jpeg"
        />
      </div>
         </div>
  );
};

export default CategoryContainer;

interface CategoryItemProps {
  title: string;
  imageUrl: string;
  href: string;
}

export const CategoryItem: FC<CategoryItemProps> = ({
  title,
  imageUrl,
  href,
}) => {
  return (
    <Link href={`/categories/${href}`}>
      <div className="w-[295px] h-[430px] relative group overflow-hidden">
        <div className="w-full h-full left-0 top-0 absolute bg-black rounded-md">
          <Image
            src={imageUrl ?? "/images/black-watch.jpeg"}
            alt="Watch Image"
            height={450}
            width={300}
            className="w-[295px] h-[430px] object-cover group-hover:scale-105 transition group-hover:opacity-50 opacity-70 rounded-md"
          />
        </div>
        <h2 className="w-48 h-9 left-[54.44px] top-[160px] absolute text-center text-white text-4xl font-medium leading-normal">
          {title ?? "Item"}
        </h2>
      </div>
    </Link>
  );
};
