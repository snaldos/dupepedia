import Image from "next/image";
import { Fragrance } from "@/interfaces/models";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function FragranceCard({
  fragrance,
  className,
}: {
  fragrance: Fragrance | null;
  className?: string;
}) {
  return (
    <Link className="" href={`fragrances/${fragrance?.slug}`}>
      <Card
        className={cn(
          "shadow-lg overflow-hidden w-[200px] transition-transform duration-300 ease-in-out hover:scale-105",
          className,
        )}
      >
        <CardHeader></CardHeader>
        <CardContent className="w-full px-10">
          <div className="flex items-center justify-center relative w-full h-0 pb-[133.2%]">
            {fragrance?.image && (
              <Image
                alt={fragrance?.id}
                src={fragrance?.image}
                fill
                sizes="118.4px"
                quality={100}
                priority
                className=""
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <CardTitle className="text-md">
            <div className="h-16 flex pt-4 text-center">
              <p className="text-gray-700">{fragrance?.name}</p>
            </div>
          </CardTitle>
          {/* <CardDescription className="flex items-center justify-center pb-2"> */}
          {/*   {fragrance?.brand.name} */}
          {/* </CardDescription> */}
          {/* <div className="h-56 flex pt-8 justify-center"> */}
          {/*   <p className="text-sm text-gray-700">{fragrance?.description}</p> */}
          {/* </div> */}
        </CardFooter>
      </Card>
    </Link>
  );
}
