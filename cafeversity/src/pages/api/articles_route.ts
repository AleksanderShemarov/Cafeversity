import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const PeopleFoodArticlesHadler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        let people_food_articles = await prisma.people_and_food.findMany();
        prisma.$disconnect();
        return res.status(200).json(people_food_articles);
    } else {
        prisma.$disconnect();
        return res.status(500).json({error: `This request (${req.method}) is impossible now, because it isn't written.`});
    }

}

export default PeopleFoodArticlesHadler;
