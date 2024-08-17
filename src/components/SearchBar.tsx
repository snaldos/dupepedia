import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi"; // Import the search icon from react-icons

export function SearchBar() {
  return (
    <div className="flex flex-1 w-full items-center space-x-2">
      <div className="relative flex w-full">
        <Input
          className="bg-gray-100 pr-10"
          type="text"
          placeholder="What fragrance are you looking for?"
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3"
        >
          <FiSearch />
        </Button>
      </div>
    </div>
  );
}
