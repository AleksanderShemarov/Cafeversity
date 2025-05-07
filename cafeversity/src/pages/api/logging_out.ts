import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const LoggingOut: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userSessionId = req.cookies.sessionId;
    if (!userSessionId) {
        return res.status(400).json({ message: "Session hasn't been found!" });
    }

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.users.findUnique({
                where: {
                    sessionId: userSessionId
                }
            });

            if (!user) {
                throw new Error("This User isn't found!");
            }

            await tx.users.update({
                where: {
                    id: user.id
                },
                data: {
                    sessionId: null
                }
            });
        });
        
        res.setHeader('Set-Cookie', 'sessionId=; Path=/; HttpOnly; Secure; Max-Age=0; SameSite=Strict');
        
        return res.status(200).json({
            message: "Exit have been done!",
            redirect: `/`,
        });
    } catch (error) {
        console.error(`Exit Error: ${error}`);
        return res.status(500).json({
            message: "Error during exiting!",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

export default LoggingOut;
