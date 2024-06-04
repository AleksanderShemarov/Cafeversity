import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import comparePasswords from "../../../lib/utils/passwordUtils";


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
                return res.status(201).json({
                    message: "Entrance is accepted!",
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
    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }
}

export default LoggingIn;
