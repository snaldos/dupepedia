"use client";

import FragranceCard from "@/components/FragranceCard";
import { Fragrance } from "@/interfaces/models";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Loading from "./loading";

const fetchFragrances = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch fragrances");
  }

  return response.json();
};

export default function SearchPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const { data, error, isLoading } = useSWR(
    searchQuery ? `/api/search?q=${encodedSearchQuery}` : null, // Only fetch if searchQuery exists
    fetchFragrances,
  );

  if (!searchQuery) {
    // Beautiful search page content when there's no search query
    return (
      <div className="flex flex-col items-center justify-center py-10 px-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Fragrance</h1>
        <p className="text-lg text-gray-500 mb-8">
          Discover similar fragrances to yours! Start by entering the desired fragrance.
        </p>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <main className="container mx-auto py-10 px-8 flex items-center justify-center">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.fragrances.map((fragrance: Fragrance) => (
            <FragranceCard key={fragrance.id} fragrance={fragrance} />
          ))}
        </div>
      </main>
    </div>
  );
}
