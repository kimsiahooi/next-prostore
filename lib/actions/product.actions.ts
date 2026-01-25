"use server";
import type { ProductGetPayload } from "@/app/generated/prisma/models";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/contants";
import { prisma } from "@/lib/prisma";

export type ProductWithImages = ProductGetPayload<{
  include: {
    images: true;
  };
}>;

export async function getLatestProducts(): Promise<ProductWithImages[]> {
  return await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
    include: {
      images: true,
    },
  });
}
