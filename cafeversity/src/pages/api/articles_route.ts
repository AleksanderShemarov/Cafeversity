import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const PeopleFoodArticlesHadler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        if (req.method === "GET") {
            const { id } = req.query;
            if (id) {
                const article = await prisma.people_and_food.findUnique({
                    where: { 
                        id: Number(id),
                    },
                });
                if (article) {
                    return res.status(200).json(article);
                } else {
                    return res.status(404).json({
                        error: "Article is not found!",
                    });
                }
            } else {
                const people_food_articles = await prisma.people_and_food.findMany();
                return res.status(200).json(people_food_articles);
            }
        } else {
            return res.status(500).json({error: `This request (${req.method}) is impossible now, because it isn't written.`});
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        // await prisma.$disconnect();
    }
}

export default PeopleFoodArticlesHadler;
