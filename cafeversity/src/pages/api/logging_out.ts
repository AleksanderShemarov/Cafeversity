import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const LoggingOut: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userSessionId = req.cookies["sessionId"];
    try {
        await prisma.users.update({
            where: {
                sessionId: userSessionId,
            },
            data: {
                sessionId: "",
            }
        });
        res.setHeader('Set-Cookie', 'sessionId=; Path=/; HttpOnly; Secure; Max-Age=0; SameSite=Strict');
        return res.status(201).json({
            message: "Exit have been done!",
            redirect: `/`,
        });
    } catch (error) {
        return res.status(500).json({
            message: `${error}`,
        });
    }
}

export default LoggingOut;
