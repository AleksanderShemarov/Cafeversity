import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prismaClient";


const NewUserLanguage: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        console.log("langSet API ->", req.body);

        const [name, surname]: [string, string] = req.body["userName"].split("_");
        const lang: string = req.body["newLang"];
        const user = await prisma.users.findFirst({
            where: {
                firstName: name,
                lastName: surname,
            },
            include: {
                customSets: true,
            }
        });

        if (user) {
            await prisma.customSets.update({
                where: {
                    userId: user.id,
                },
                data: {
                    language: lang
                }
            });

            return res.status(200).json({ message: "Language has been changed!" });
        }
    }
    else {
        return res.status(500).json({error: `Request method (${req.method}) is unsupportable for langSets API.`});
    }
}

export default NewUserLanguage;
