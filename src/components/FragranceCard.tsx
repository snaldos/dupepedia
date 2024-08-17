import Image from "next/image";
import { Fragrance } from "@/interfaces/models";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function FragranceCard({ fragrance }: { fragrance: Fragrance | null }) {
  return (
    <Card className="shadow-lg overflow-hidden w-[380px]">
      <CardHeader>
        <CardTitle>
          <div className="h-24 flex items-center justify-center text-center">
            <p className="text-gray-700">{fragrance?.name}</p>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center justify-center pb-2">
          <Link href={`fragrances/${fragrance?.slug}`}>{fragrance?.price}</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full px-20">
        <div className="flex items-center justify-center relative w-full h-0 pb-[133.2%]">
          {fragrance?.image && (
            <Image alt={fragrance?.id} src={fragrance?.image} fill className="rounded-t-lg" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-56 flex pt-8 justify-center">
          <p className="text-sm text-gray-700">{fragrance?.description}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
