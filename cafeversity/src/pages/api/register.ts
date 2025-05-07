import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/utils/passwordUtils";


const Register: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === "POST") {
        const name: string = req.body.firstName;
        const surname: string = req.body["lastName"];
        const nickname: string = req.body.nickName;
        const email: string = req.body["email"];
        // const password: string = req.body.password1;
        const password2: string = req.body["password2"];

        const hashedWord = await hashPassword(password2);

        const sameUserEmail = await prisma.users.findUnique({
            where: {
                email: email
            },
        });

        if (sameUserEmail === null) {            
            await prisma.$transaction(async (prisma) => {
                const user = await prisma.users.create({
                  data: {
                    firstName: name,
                    lastName: surname,
                    nickName: nickname,
                    email: email,
                    password: hashedWord,
                  }
                });
            
                await prisma.customSets.create({
                  data: {
                    userId: user.id,
                  }
                });
            });
            
            return res.status(201).json({
                message: "User Registration is successfully ended!",
            });
        } else {
            return res.status(409).json({
                message: "This User is already existed!",
            });
        }
    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }

}

export default Register;
