import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import prisma from "./prismaClient";


async function isUserByRequestCookieAndUserPath (cookieValue: RequestCookie, userPath: string) {
    const isUser = await prisma.users.findUnique({
        where: {
            sessionId: String(cookieValue),
        }
    });
    if (isUser) {
        userPath = userPath.slice(1, userPath.split("/").length - 1 > 1 ? userPath.lastIndexOf("/") : userPath.length);
        const [userName, userSurname] = userPath.split("_");
        if (userName === isUser.firstName && userSurname === isUser.lastName) {
            return true;
        } else {
            return false;
        }
    } else {
        return Boolean(isUser);
    }
}


export default isUserByRequestCookieAndUserPath;
