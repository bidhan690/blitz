import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Product } from "@/types";
import { getSubcategories, productsCategories } from "@/config/products";

const prisma = new PrismaClient();

async function main(count = 10) {
  const allProducts = [];

  const categories = productsCategories.map((category) => category.title);

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.shuffle(categories)[0] ?? "";
    const subcategories = getSubcategories(category).map((s) => s.value);
    const subcategory = faker.helpers.shuffle(subcategories)[0] ?? "";

    allProducts.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price(), 10),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      categoryName: category,
      subCategoryName: subcategory,
      images: [],
      quantity: faker.number.int({ min: 0, max: 100 }),
      slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
    });
  }

  allProducts.map(async (product) => {
    await Promise.all([
      prisma.categories.upsert({
        where: { name: product.categoryName.toLowerCase() },
        update: {},
        create: {
          name: product.categoryName,
          slug: product.categoryName.toLowerCase(),
        },
      }),
      prisma.subCategories.upsert({
        where: { name: product.subCategoryName.toLowerCase() },
        update: {},
        create: {
          name: product.subCategoryName,
          slug: product.subCategoryName.toLowerCase(),
          categoryName: product.categoryName,
        },
      }),
    ]);
  });

  await prisma.product.createMany({
    data: allProducts,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
