"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

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
  const { data, isLoading } = useSWR(`/api/search?q=${encodedSearchQuery}`, fetchFragrances);

  console.log("DATA", data);
  return <div>Search</div>;
}
