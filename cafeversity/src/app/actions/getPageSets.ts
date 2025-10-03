"use server";

import prisma from "../../../lib/utils/prismaClient";
import { cookies } from "next/headers";
import { PageSetsTypes } from "../(userPage)/authorized/[authorizedUser]/menu/page";


export default async function getPageSets(): Promise<PageSetsTypes> {
    const cookieFile = cookies().get("sessionId");

    if (!cookieFile?.value) {
        return {
            pageTheme: 'light',
            brandColor: 'gold',
            fontFamily: 'Consolas, monospace',
            fontSize: '10px',
            fontVolume: '{"fontWeight":"normal","fontStyle":"normal"}'
        };
    }

    const user = await prisma.users.findUnique({
        where: {
            sessionId: cookieFile?.value
        },
        select: {
            customSets: {
                select: {
                    pageTheme: true,
                    brandColor: true,
                    fontFamily: true,
                    fontSize: true,
                    fontVolume: true
                }
            }
        }
    });

    if (!user || !user.customSets) {
        return {
            pageTheme: 'light',
            brandColor: 'gold',
            fontFamily: 'Consolas, monospace',
            fontSize: '10px',
            fontVolume: '{"fontWeight":"normal","fontStyle":"normal"}'
        };
    }

    const customSets = user.customSets as PageSetsTypes;
    
    return {
        pageTheme: customSets.pageTheme,
        brandColor: customSets.brandColor,
        fontFamily: customSets.fontFamily,
        fontSize: customSets.fontSize,
        fontVolume: customSets.fontVolume
    };
}
