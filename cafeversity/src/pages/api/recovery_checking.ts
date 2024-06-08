import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/utils/passwordUtils";


const RecoveryChecking: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const userToken: string = req.body.receivedToken;
        const newPassword: string = req.body.password;

        try {
            const user = await prisma.users.findUnique({
                where: {
                    resetToken: userToken,
                }
            });
            if (user) {
                const todayDateTime = new Date().getTime();
                const userTokenTime = user.resetTokenExpiry ? user.resetTokenExpiry.getTime() : 0;
                if (userTokenTime !== 0 && todayDateTime <= userTokenTime) {
                    const newHashedPass = await hashPassword(newPassword);

                    await prisma.users.update({
                        where: {
                            resetToken: userToken,
                        },
                        data: {
                            password: newHashedPass,
                        }
                    })

                    return res.status(201).json({ message: "Your password is successfully updated! Move in Signing In page." });
                } else {
                    return res.status(409).json({ message: "Reset Key isn't already active or isn't found!" });
                }
            } else {
                return res.status(409).json({ message: "The user by token isn't found!" });
            }
        } catch (error) {
            return res.status(500).json({ message: `An error during token initialization: ${error}` });
        }

    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }
}

export default RecoveryChecking;
