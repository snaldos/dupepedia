import FragranceCard from "@/components/FragranceCard";
import prisma from "@/lib/db";

export default async function FragrancePage({ params }: { params: { slug: string } }) {
  const fragrance = await prisma.fragrance.findUnique({
    where: { slug: params.slug },
    include: {
      brand: true,
      category: true,
      ingredients: true,
    },
  });

  return (
    <div>
      <main className="container mx-auto py-36 px-8 flex items-center justify-center">
          <FragranceCard key={fragrance?.slug} fragrance={fragrance} />
      </main>
    </div>
  );
}
