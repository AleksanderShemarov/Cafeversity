import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import isUserByRequestCookieAndUserPath from "../../../lib/utils/isUserPath";


const UserChecking: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const isSessionTrue: boolean = await isUserByRequestCookieAndUserPath(req.body.session, req.body.userPath);
        return res.status(201).json({ session: isSessionTrue });
    }
    else return res.setHeader("Allow", ["POST"]).status(405).end(`Method ${req.method} is not allowed!`);
}

export default UserChecking;
