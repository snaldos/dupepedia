import type { NextApiRequest, NextApiResponse } from "next";
import { Fragrance } from "@/interfaces/models";
import prisma from "@/lib/db";

type ResponseData = {
  fragrances: Array<Fragrance>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /*
       * Search fragrances
       */
      const fragrances = await prisma.fragrance.findMany({
        include: {
          brand: true,
          category: true,
          ingredients: true, // Include the related ingredients
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          OR: [
            // {
            //   brand: {
            //     name: {
            //       contains: query.toLowerCase(),
            //     },
            //   },
            // },
            {
              name: {
                contains: query.toLowerCase(),
              },
            },
            {
              nameWithoutAccents: {
                contains: query.toLowerCase(),
              },
            },
          ],
        },
      });

      res.status(200).json({ fragrances: fragrances });
    } catch (error) {
      res.status(500).end();
    }
  }
}
