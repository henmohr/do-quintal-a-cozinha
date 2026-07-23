import { prisma } from "@/lib/prisma";

type params = { params: Promise<{ recipe_id: string; media_id: string }> };

export async function DELETE(request: Request, { params }: params) {
  const { recipe_id, media_id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipe_id },
  });

  if (!recipe) {
    return new Response(JSON.stringify({ error: "Recipe not found" }), {
      status: 404,
    });
  }

  const media = await prisma.media.findUnique({ where: { id: media_id } });

  if (!media) {
    return new Response(JSON.stringify({ error: "Media not found" }), {
      status: 404,
    });
  }

  await prisma.media.delete({ where: { id: media_id } });

  return new Response(
    JSON.stringify({ message: "Media deleted successfully" }),
    { status: 200 }
  );
}
