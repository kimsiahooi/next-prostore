import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/app/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute: (product) => product.price.toString(),
      },
      rating: {
        compute: (product) => product.rating.toString(),
      },
    },
    cart: {
      itemsPrice: {
        compute: (cart) => cart.itemsPrice.toString(),
      },
      totalPrice: {
        compute: (cart) => cart.totalPrice.toString(),
      },
      shippingPrice: {
        compute: (cart) => cart.shippingPrice.toString(),
      },
      taxPrice: {
        compute: (cart) => cart.taxPrice.toString(),
      },
    },
  },
});

export { prisma };
