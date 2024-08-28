"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi"; // Import the search icon from react-icons
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <form className="relative flex w-full items-center space-x-2" onSubmit={onSearch}>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-accent pr-10 border-none"
        type="text"
        placeholder="What fragrance are you looking for?"
      />
      <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full px-3">
        <FiSearch />
      </Button>
    </form>
  );
}
