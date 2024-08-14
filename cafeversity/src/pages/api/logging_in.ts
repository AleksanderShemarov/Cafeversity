import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import comparePasswords from "../../../lib/utils/passwordUtils";
import createSessionsIdAndCookies from "../../../lib/utils/sessionID";


const LoggingIn: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const email: string = req.body.email;
        const password: string = req.body.password;

        const user = await prisma.users.findUnique({
            where: {
                email: email,
            }
        });
        if (user) {
            const isTheSamePassword = await comparePasswords(password, user ? user.password : "");
            if (isTheSamePassword) {
                const sessionId = createSessionsIdAndCookies();
                await prisma.users.update({
                    where: {
                        email: email,
                    },
                    data: {
                        sessionId: sessionId,
                    }
                });
                res.setHeader("Set-Cookie", `sessionId=${sessionId}; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict`);// Cookie-file for an 1 hour
                return res.status(201).json({
                    message: "Entrance is accepted!",
                    redirect: `/${user.firstName}_${user.lastName}`,
                });
            } else {
                res.status(409).json({
                    message: "The password is incorrect!",
                });
            }
        } else {
            return res.status(409).json({
                message: "This email is incorrect or isn't registrated!",
            })
        }
    } else if (req.method === "GET") {
        // Entrance.tsx in CommonHeader.tsx
        const userSessionId = req.cookies["sessionId"];
        if (userSessionId !== undefined) return res.status(201).json({ 
            message: "You are still logged in.",
            userSessionId: true,
        });
        else return res.status(201).json({
            message: "You need relogging in!",
            userSessionId: false,
        });
    } else {
        return res.setHeader("Allow", ["GET", "POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }
}

export default LoggingIn;
