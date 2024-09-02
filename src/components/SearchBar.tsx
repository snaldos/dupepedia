"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch, FiX } from "react-icons/fi"; // Import the search icon from react-icons
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    // Retrieve the previous URL from local storage if it exists
    const storedPrevUrl = localStorage.getItem("prevUrl") || "";

    // If there's a stored URL and no search query, navigate to it
    if (pathname === "/search" && storedPrevUrl != "") {
      router.push(storedPrevUrl);
    }

    // Set the previous URL to state
    setPrevUrl(storedPrevUrl);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.querySelector("input")?.blur();
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
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (!isFocused) {
      router.push(prevUrl);
    }
  };

  return (
    <form className="relative flex w-full items-center" onSubmit={onFormSubmit}>
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          value={searchQuery}
          onChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="pl-10 h-11 pr-10 py-2 rounded-full bg-accent border-none 
                     focus:ring-2 focus:ring-primary focus:ring-opacity-50
                     focus:outline-none transition-all duration-300 ease-in-out shadow-md"
          type="text"
          placeholder="What fragrance are you looking for?"
        />
        {searchQuery !== "" && (
          <Button
            type="button"
            onClick={clearSearch}
            variant={"ghost"}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            <FiX />
          </Button>
        )}
      </div>
    </form>
  );
}
