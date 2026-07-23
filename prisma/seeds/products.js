import pkg from '@prisma/client';
const { MediaType, Category } = pkg;
import { v4 as uuidv4 } from 'uuid';

const productsData = [
  {
    product_name: "Malcasado",
    description: "Saboroso macasado caseiro",
    category: Category.PROCESSADO,
    image: "https://md.coolab.org/uploads/upload_017b9a928c4570b12765c879c1231262.jpeg",
  },
  {
    product_name: "Pé de Moleque",
    description: "Pé de Moleque com assado na folha de bananeira",
    category: Category.PROCESSADO,
    image: "https://md.coolab.org/uploads/upload_238a4f1269f0e4126d3774d68d84c992.jpeg",
  },
  {
    product_name: "Cocada mundinha",
    description: "Cocada mundinha com gosto de infancia",
    category: Category.PROCESSADO,
    image: "https://md.coolab.org/uploads/upload_289c1845efd5caf8b2be1492fc73ab0c.jpeg",
  },
  {
    product_name: "Bolo de Macaxeira",
    description: "Bolo de macaxeira da vó",
    category: Category.PROCESSADO,
    image: "https://md.coolab.org/uploads/upload_c5b15456eea74eac7fe8630455570585.jpeg",
  },
];

const profile = {
  name: "Edna Salgado",
  phone_number: "+557996847218",
};

export async function seedProducts(prisma) {
  if (!prisma) throw new Error('Prisma client is required');

  // cria ou atualiza o profile uma vez
  const createdProfile = await prisma.profile.upsert({
    where: { phone_number: profile.phone_number },
    update: { name: profile.name },
    create: {
      id: uuidv4(),
      name: profile.name,
      phone_number: profile.phone_number,
    },
  });

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        id: uuidv4(),
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        profile: {
          connect: { id: createdProfile.id },
        },
        media: {
          create: {
            media: {
              create: {
                id: uuidv4(),
                media_type: MediaType.IMAGE,
                url: product.image,
              },
            },
          },
        },
      },
    });
  }

  return prisma.product.findMany({ where: { profile: { id: createdProfile.id } } });
}