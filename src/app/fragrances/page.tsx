import FragranceCard from "@/components/FragranceCard";
import prisma from "@/lib/db";

export default async function FragrancesPage() {
  const fragrances = await prisma.fragrance.findMany({
    include: {
      brand: true,
      category: true,
      ingredients: true, // Include the related ingredients
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(fragrances);

  return (
    <div>
      <main className="container mx-auto py-10 px-8 flex items-center justify-center">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fragrances.map((fragrance) => (
            <FragranceCard key={fragrance.id} fragrance={fragrance} />
          ))}
        </div>
      </main>
    </div>
  );
}
