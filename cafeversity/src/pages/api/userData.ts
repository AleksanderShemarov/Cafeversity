import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/utils/prismaClient";


const userCommonData: NextApiHandler = async (request:NextApiRequest, response: NextApiResponse) => {
    if (request.method === "GET") {
        console.log(request.query);
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
                        firstName: true,
                        lastName: true,
                        nickName: true,
                        userPhoto: true,
                        customSets: {
                            select: {
                                language: true,
                            }
                        }
                    }
                });
                console.log("user API ->", user);
                return response.status(200).json(user);
            } else {
                return response.status(400).json({ message: "Incorrect connect." });
            }
        }
    } else if (request.method === "POST") {
        console.log("userData API ->", request.query);
        const { page } = request.query;
        if (page === "settings") {
            const oldName: string = request.body.oldName;
            const oldNickname: string = request.body.oldNickname;

            const newName: string = request.body.newName;
            const newSurname: string = request.body["newSurname"];
            const { newNickname } = request.body;
            const { newUserPhoto } = request.body;

            console.log(request.body);
            if (oldName && oldNickname && newName !== "" && newSurname !== "" && newNickname !== undefined && newUserPhoto !== undefined) {
                const user = await prisma.users.findFirst({
                    where:  {
                        AND: [
                            { firstName: oldName.split("_")[0] },
                            { lastName: oldName.split("_")[1] },
                            { nickName: oldNickname },
                        ],
                    },
                });
                await prisma.users.update({
                    where: {
                        id: user?.id,
                    },
                    data: {
                        firstName: newName,
                        lastName: newSurname,
                        nickName: newNickname,
                        userPhoto: newUserPhoto,
                    }
                });
                return response.status(201).json({ status: "Success", redirect: `/${newName}_${newSurname}/settingsPage` });
            } else {
                return response.status(400).json({ status: "Error", message: "Check your data! Whatever is incorrect." });
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
