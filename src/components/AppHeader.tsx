"use client";

import { useState, useEffect } from "react";
import { GiDelicatePerfume } from "react-icons/gi";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { SearchBar } from "@/components/SearchBar";

export function AppHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close the sheet if the screen is resized to larger than md
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && isSheetOpen) {
        setIsSheetOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [isSheetOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between h-20 w-full shrink-0 items-center px-3 md:px-6 gap-4 border bg-card text-card-foreground transition-shadow duration-300 ease-in-out shadow-sm hover:shadow-md">
      <div className="flex items-center gap-2 md:w-[100px] xl:w-[200px]">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="px-0 md:hidden">
              <RxHamburgerMenu size={28} className="text-gray-500" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-4 bg-gray-50">
            <SheetClose asChild>
              <Link href="#" prefetch={false} className="flex items-center mb-6">
                <GiDelicatePerfume size={24} className="text-gray-700" />
                <span className="sr-only">Company Logo</span>
              </Link>
            </SheetClose>
            <nav className="grid gap-4">
              {["Home", "About", "Services", "Portfolio", "Contact", "Fragrances"].map((path) => (
                <SheetClose asChild key={path}>
                  <Link
                    href={path === "Home" ? "/" : `/${path.toLowerCase()}`}
                    className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    prefetch={false}
                  >
                    {path}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="hidden md:flex" prefetch={false}>
          <GiDelicatePerfume size={30} />
          <span className="sr-only">Company Logo</span>
        </Link>
        {/* Centered SearchBar */}
      </div>
      <div className="flex flex-grow items-center justify-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <SearchBar />
      </div>
      <div className="hidden md:flex md:w-[100px] xl:w-[200px] justify-end">
        <NavigationMenu className="">
          <NavigationMenuList>
            {["Fragrances"].map((path, index) => (
              <NavigationMenuLink className="hidden xl:flex" asChild key={index}>
                <Link
                  href={`/${path.toLowerCase()}`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors"
                  prefetch={false}
                >
                  {path}
                </Link>
              </NavigationMenuLink>
            ))}

            {["Log In"].map((path, index) => (
              <NavigationMenuLink asChild key={index}>
                <Link
                  href={path === "Home" ? "/" : `/${path.toLowerCase()}`}
                  className={`group inline-flex h-11 w-max items-center justify-center rounded-full ${path === "Log In" ? "text-white bg-black" : "text-black bg-white"} px-4 py-2 text-sm font-medium transition-colors`}
                  prefetch={false}
                >
                  {path}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
