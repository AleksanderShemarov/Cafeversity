import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "@/../../lib/utils/prismaClient";


const LookingForUserLanguage: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const userSessionId = req.body["value"];
        console.log("API has the sessionId have got from the request body ->", userSessionId);
        if (userSessionId !== undefined) {
            const user = await prisma.users.findUnique({
                where: {
                    sessionId: userSessionId,
                },
                include: {
                    customSets: true,
                }
            });

            if (user) {
                const userLanguage = user.customSets?.language;
                return res.status(200).json({ language: userLanguage });
            }
        }
    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(
            `Method ${req.method} is not allowed for "lookingForLanguage"!`
        );
    }
}

export default LookingForUserLanguage;
