import { sampleData } from "@/db/sample-data";
import { prisma } from "@/lib/prisma";

console.log("Database seeding...");

async function main() {
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  for (const product of sampleData.products) {
    await prisma.product.create({
      data: {
        ...product,
        images: {
          create: product.images.map((image) => ({ path: image })),
        },
      },
    });
  }

  await prisma.user.createMany({ data: sampleData.users });
}

main()
  .then(async () => {
    console.log("Database seeded successfully!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
