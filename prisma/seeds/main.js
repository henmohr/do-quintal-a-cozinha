import { PrismaClient } from "@prisma/client";
import { seedStories } from "./stories.js";
import { seedProducts } from "./products.js";
import { seedRecipes } from "./recipes.js";
import { seedRegions } from "./regions.js";

const prisma = new PrismaClient();

async function main() {

  await seedRegions(prisma);
  await seedStories(prisma);
  const allStories = await prisma.story.findMany();
  console.log(`Seeds stories done: ${allStories.length}`);

  await seedProducts(prisma);
  const allProducts = await prisma.product.findMany();
  console.log(`Seeded products: ${allProducts.length}`);

  await seedRecipes(prisma);
  const allRecipes = await prisma.recipe.findMany();
  console.log(`Seeded recipes: ${allRecipes.length}`);
}
main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});
