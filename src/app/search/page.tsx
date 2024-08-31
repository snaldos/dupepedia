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
  const { data, error, isLoading } = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchFragrances);

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
