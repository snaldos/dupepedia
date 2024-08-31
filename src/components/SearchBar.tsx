"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi"; // Import the search icon from react-icons
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the previous URL from local storage if it exists
    const storedPrevUrl = localStorage.getItem("prevUrl");

    // If there's a stored URL and no search query, navigate to it
    if (storedPrevUrl) {
      router.push(storedPrevUrl);
    }

    // Set the previous URL to state
    setPrevUrl(storedPrevUrl || "");
  }, [router]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onSearch = (searchQuery: string) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    onSearch(searchQuery);
  };

  const onFocus = () => {
    setIsFocused(true);

    if (searchQuery === "") {
      const currentUrl = window.location.pathname + window.location.search;
      setPrevUrl(currentUrl);
      // Store the current URL in local storage
      localStorage.setItem("prevUrl", currentUrl);
      onSearch(searchQuery);
    }
  };

  const onBlur = () => {
    setIsFocused(false);
    if (searchQuery === "") {
      router.push(prevUrl);
    }
    // else {
    //   setSearchQuery("");
    // }
  };

  return (
    <form className="relative flex w-full items-center space-x-2" onSubmit={onFormSubmit}>
      <Input
        value={searchQuery}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
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
