"use server";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/contants";
import { prisma } from "@/lib/prisma";

export async function getLatestProducts() {
  return await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
    include: {
      images: true,
    },
  });
}
