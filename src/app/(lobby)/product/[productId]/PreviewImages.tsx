"use client";
import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, useState } from "react";

interface PreviewImagesProps {
  images: string[];
}



const PreviewImages: FC<PreviewImagesProps> = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const toggleImage = (type: string) => {
    if (type === "increment") {
      const index = images.indexOf(mainImage);
      if (index === images.length - 1) {
        setMainImage(images[0]);
      } else {
        setMainImage(images[index + 1]);
      }
    } else {
      const index = images.indexOf(mainImage);
      if (index === 0) {
        setMainImage(images[images.length - 1]);
      } else {
        setMainImage(images[index - 1]);
      }
    }
  };

  return (
    <div className="w-full p-2 justify-center items-center flex flex-col gap-y-3">
      <AspectRatio ratio={1}>
        <Image
          className="object-cover rounded-lg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={mainImage ?? "/images/product-placeholder.webp"}
          alt="images"
        />
      </AspectRatio>
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-3">
          <Button
            onClick={() => toggleImage("decrement")}
            size="icon"
            className="hidden md:flex bg-white hover:bg-gray-100"
          >
            <Icons.chevronLeft className="w-8 h-8 lg:h-6 lg:6" color="black" />
          </Button>
          {images.map((image) => (
            <div
              key={image}
              className={cn(
                "w-28 h-28 lg:w-40 lg:h-40 rounded-lg cursor-pointer",
                {
                  "ring-2 ring-offset-2 ring-blue-500": mainImage === image,
                },
              )}
            >
              <Image
                className="w-28 h-28 lg:w-40 lg:h-40 rounded-lg object-cover"
                width={200}
                height={200}
                src={image ?? "/images/product-placeholder.webp"}
                alt="images"
                onClick={() => setMainImage(image)}
              />
            </div>
          ))}
          <Button
            onClick={() => toggleImage("increment")}
            size="icon"
            className="hidden md:flex bg-white hover:bg-gray-100"
          >
            <Icons.chevronRight className="w-8 h-8 lg:h-6 lg:6" color="black" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreviewImages;
