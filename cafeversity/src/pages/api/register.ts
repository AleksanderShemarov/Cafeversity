// import prisma from "../../../lib/utils/prismaClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const Register: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === "POST") {
        const { firstName, lastName, nickName, email, password1, password2 } = req.body;
        console.log(req.body);
        console.log(`firstName: ${firstName}`);
        console.log(`lastName: ${lastName}`);
        console.log(`nickName: ${nickName}`);
        console.log(`email: ${email}`);
        console.log(`password1: ${password1}`);
        console.log(`password2: ${password2}`);
        return res.status(200).json({ 
            firstName,
            lastName,
            nickName,
            email,
            password1,
            password2,
        });
    } else {
        return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
    }

}

export default Register;
