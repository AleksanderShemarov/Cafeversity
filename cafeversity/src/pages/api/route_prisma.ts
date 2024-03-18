import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const Handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const prisma = new PrismaClient();

    if (req.method === "GET") {
        let dishes = await prisma.dishes_BY.findMany();
        prisma.$disconnect();
        return res.status(200).json(dishes);
    } else {
        prisma.$disconnect();
        return res.status(500).json({error: "This request is impossible now, because it isn't written."});
    }
}

export default Handler;
