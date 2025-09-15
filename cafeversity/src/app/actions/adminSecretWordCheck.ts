"use server";

import { cookies } from "next/headers";
import prisma from "../../../lib/utils/prismaClient";
import createSessionsIdAndCookies from "../../../lib/utils/sessionID";


export default async function adminSecretWordCheck(adminId: number, secretWord: string) {

    const admin = await prisma.adminUsers.findUnique({
        where: {
            ID: Number(adminId)
        },
        select: {
            ID: true,
            Name: true,
            Surname: true,
            SecretWord: true,
            // SecretWordUsed: true
        }
    });

    if (!admin) return { code: false, message: "Admin hasn't been found!" };

    if (secretWord === admin.SecretWord) {
        // if (!admin.SecretWordUsed) {
        //     await prisma.adminUsers.update({
        //         where: {
        //             ID: admin.ID
        //         },
        //         data: {
        //             SessionId: sessionId,
        //             SecretWordUsed: true
        //         }
        //     });
        //     cookies().set("adminSessionId", sessionId);
        //     return { code: true, message: "Entrance is accessed!", redirect: `/admin/${admin.Name}_${admin.Surname}/dashboard` };
        // } else {
        //     return { code: false, message: "You can't get accession for the entrance, because you used your secret word earlier!" };
        // }
        const sessionId = createSessionsIdAndCookies();
        await prisma.adminUsers.update({
            where: {
                ID: admin.ID,
            },
            data: {
                SessionId: sessionId,
            }
        });

        cookies().set("adminSessionId", sessionId);

        return { code: true, message: "Entrance is accessed!", redirect: `/admin/${admin.Name}_${admin.Surname}/dashboard` };
    } else {
        return { code: false, message: "Secret word isn't correct! Try again." };
    }
}
