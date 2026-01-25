"use client";
import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/app/generated/prisma/client";
import { cn } from "@/lib/utils";

export default function ProductImages({ images }: { images: ProductImage[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current].path}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-75 object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setCurrent(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500",
            )}>
            <Image src={image.path} alt="image" width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  );
}
