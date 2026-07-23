import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  const stories = await prisma.story.findMany();
  for (const st of stories) {
    if (st.slug) continue;
    const base = slugify(st.name ?? st.title ?? st.id);
    let candidate = base || st.id;
    let i = 1;
    while (await prisma.story.findUnique({ where: { slug: candidate } })) {
      candidate = `${base}-${i++}`;
    }
    await prisma.story.update({
      where: { id: st.id },
      data: { slug: candidate },
    });
    console.log(`updated ${st.id} -> ${candidate}`);
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });