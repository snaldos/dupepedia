"use client";

import Image from "next/image";
import FragranceCard from "@/components/FragranceCard";
import { Fragrance } from "@/interfaces/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FiX } from "react-icons/fi"; // Import the search icon from react-icons
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { fetchFragrances } from "@/lib/utils";
import Link from "next/link";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // const encodedSearchQuery = encodeURI(searchQuery || "");
  // const { data, error, isLoading } = useSWR(
  //   searchQuery ? `/api/search?q=${encodeURIComponent(encodedSearchQuery)}` : null,
  //   fetchFragrances,
  // );

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
    setSearchQuery(searchQuery);
    onSearch(searchQuery);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchQuery("");
      (e.target as HTMLInputElement).blur(); // Blurring the input
      router.push(prevUrl);
    }
  };

  return (
    <form className="relative flex w-full items-center" onSubmit={onFormSubmit}>
      <div className="relative w-full">
        <FaMagnifyingGlass
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          value={searchQuery}
          onChange={onInputChange}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          className="h-11 px-10 py-2 rounded-full bg-accent border-none 
              focus:ring-2 focus:ring-primary focus:ring-opacity-50
              focus:outline-none transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
          type="text"
          placeholder="Search for a fragrance..."
        />
        {searchQuery !== "" && (
          <Button
            type="button"
            onClick={clearSearch}
            variant="ghost"
            className="text-gray-500 focus:outline-none absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <FiX className="h-5 w-5" />
          </Button>
        )}
      </div>
      {/* {isFocused && ( */}
      {/*   <div className=""> */}
      {/*     {error && ( */}
      {/*       <p className="text-red-500 absolute top-12 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-10 flex flex-col"> */}
      {/*         Failed to load fragrances */}
      {/*       </p> */}
      {/*     )} */}

      {/*     {data?.fragrances && data.fragrances.length > 0 ? ( */}
      {/*       <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 shadow-lg rounded-lg z-10 flex flex-col"> */}
      {/*         {data.fragrances.map((fragrance: Fragrance) => ( */}
      {/*           <Link */}
      {/*             href={`/fragrances/${fragrance.slug}`} */}
      {/*             key={fragrance.id} */}
      {/*             className="flex items-center p-4 hover:bg-gray-100 transition-colors cursor-pointer" */}
      {/*           > */}
      {/*             <div className="flex items-center justify-center w-20 bg-white p-4"> */}
      {/*               <div className="flex items-center justify-center relative w-full h-0 pb-[133.2%]"> */}
      {/*                 {fragrance?.image && ( */}
      {/*                   <Image */}
      {/*                     alt={fragrance?.id} */}
      {/*                     src={fragrance?.image} */}
      {/*                     fill */}
      {/*                     // sizes="118.4px" */}
      {/*                     quality={100} */}
      {/*                     priority */}
      {/*                     className="" */}
      {/*                   /> */}
      {/*                 )} */}
      {/*               </div> */}
      {/*             </div> */}
      {/*             <div className="flex-1"> */}
      {/*               <h3 className="font-semibold text-gray-800">{fragrance.name}</h3> */}
      {/*               <p className="text-sm text-gray-500">{fragrance.brand.name}</p> */}
      {/*             </div> */}
      {/*           </Link> */}
      {/*         ))} */}
      {/*       </div> */}
      {/*     ) : null} */}
      {/*   </div> */}
      {/* )} */}
    </form>
  );
}
