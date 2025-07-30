import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/utils/prismaClient";


const userCommonData: NextApiHandler = async (request:NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        const { name } = request.query;
        const { page } = request.query;
        if (name && typeof name === "string") {
            const nameSurname: string[] = name.split("_");
            if (page === undefined) {
                const user = await prisma.users.findFirst({
                    where: {
                        AND: [
                            { firstName: nameSurname[0] },
                            { lastName: nameSurname[1] },
                        ],
                    },
                    select: {
                        firstName: true,
                        lastName: true,
                        userPhoto: true,
                        customSets: {
                            select: {
                                spicy: true,
                                vegetarian: true,
                                vegan: true,
                                minCalory: true,
                                maxCalory: true,
                                pageTheme: true,
                                brandColor: true,
                                fontFamily: true,
                                fontSize: true,
                                fontVolume: true,
                            }
                        }
                    }
                });
                return response.status(200).json(user);
            } else if (page === "settings") {
                const user = await prisma.users.findFirst({
                    where: {
                        AND: [
                            { firstName: nameSurname[0] },
                            { lastName: nameSurname[1] },
                        ],
                    },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        nickName: true,
                        userPhoto: true,
                        customSets: {
                            select: {
                                spicy: true,
                                vegetarian: true,
                                vegan: true,
                                minCalory: true,
                                maxCalory: true,
                                language: true,
                                pageTheme: true,
                                brandColor: true,
                                fontFamily: true,
                                fontSize: true,
                                fontVolume: true,
                            }
                        }
                    }
                });
                return response.status(200).json(user);
            } else {
                return response.status(400).json({ message: "Incorrect connect." });
            }
        }
    } else if (request.method === "POST") {
        const { page } = request.query;
        if (page === "settings") {
            const oldName: string = request.body.oldName;
            const oldNickname: string = request.body.oldNickname;

            const newName: string = request.body.newName;
            const newSurname: string = request.body["newSurname"];
            const { newNickname } = request.body;
            const { newUserPhoto } = request.body;

            console.log(request.body);

            if (oldName && newName && newSurname) {
                const [oldFirstName, oldLastName] = oldName.split("_");

                await prisma.$transaction(async (tx) => {
                    const user = await tx.users.findFirst({
                        where: {
                            firstName: oldFirstName,
                            lastName: oldLastName,
                            nickName: oldNickname
                        }
                    });

                    if (!user) throw new Error("User not found!");

                    await tx.users.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            firstName: newName,
                            lastName: newSurname,
                            nickName: newNickname,
                            userPhoto: newUserPhoto
                        }
                    });
                });

                return response.status(200).json({
                    status: "Success",
                    redirect: `/${newName}_${newSurname}/settingsPage`
                });
            }
        } else {
            return response.status(400).json({ message: "Incorrect connect." });
        }
    } 
    else {
        return response.status(500).json({error: `This request (${request.method}) is impossible.`});
    }
}

export default userCommonData;
