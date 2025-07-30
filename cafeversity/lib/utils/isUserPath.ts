import prisma from "./prismaClient";


async function isUserByRequestCookieAndUserPath (cookieValue: string, userPath: string) {
    const isUser = await prisma.users.findUnique({
        where: {
            sessionId: cookieValue,
        }
    });
    const isAdmin = await prisma.adminUsers.findUnique({
        where: {
            SessionId: cookieValue,
        }
    })

    if (isUser) {
        userPath = userPath.split("/")[2];
        const [userName, userSurname] = userPath.split("_");

        if (userName === isUser.firstName && userSurname === isUser.lastName) {
            return true;
        } else {
            return false;
        }
    } else if (isAdmin) {
        userPath = userPath.split("/")[2];
        const [name, surname] = userPath.split("_");

        if (name === isAdmin.Name && surname === isAdmin.Surname) {
            return true;
        } else {
            return false;
        }
    } else {
        return Boolean(isUser);
    }
}


export default isUserByRequestCookieAndUserPath;
