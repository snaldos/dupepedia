import FragranceCard from "@/components/FragranceCard";
import prisma from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function FragrancePage({ params }: { params: { slug: string } }) {
  const fragrance = await prisma.fragrance.findUnique({
    where: { slug: params.slug },
    include: {
      brand: true,
      category: true,
      ingredients: true,
    },
  });

  const similarFragrances = await prisma.fragrance.findMany({
    include: {
      brand: true,
      category: true,
      ingredients: true, // Include the related ingredients
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <main className="container mx-auto py-16 px-8 flex flex-col  justify-center space-y-10">
        {/* Main fragrance card */}
        <FragranceCard key={fragrance?.slug} className="w-[250px]" fragrance={fragrance} />

        {/* Similar fragrances section */}
        <section className="w-full mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Similar Fragrances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarFragrances.map((similarFragrance) => (
              <FragranceCard key={similarFragrance.slug} fragrance={similarFragrance} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
