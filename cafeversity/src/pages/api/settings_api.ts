import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prismaClient";


const SettingsApiRoute: NextApiHandler = async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        const { name } = request.query;

        if (name && typeof name === "string") {
            const firstLast = name.split("_");

            const user = await prisma.users.findFirst({
                where: {
                    AND: [
                        { firstName: firstLast[0] },
                        { lastName: firstLast[1] },
                    ],
                },
                select: {
                    isSpicy: true, isVegetarian: true, isVegan: true,
                    caloriesRange: true, language: true, interfaceColor: true, choiceColor: true,
                    fonFamily: true, fontSize: true, fontWeight: true,
                }
            });

            return response.status(200).json(user);
        } else {
            return response.status(400).json({ message: "Incorrect connect! No query attribute was sent to SettingsApiRoute." });
        }
    }
}

export default SettingsApiRoute;