import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const name = searchParams.get("name");
    const page = searchParams.get("page");

    if (name !== null && typeof name === "string") {
        const nameSurname: string[] = name.split("_");
        if (page === null) {
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
                    email: true,
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
                    },
                    favouriteDish: {
                        select: {
                            dishID: true,
                            dishes: {
                                select: {
                                    food_name: true,
                                    imagePath: true,
                                    food_portion: true,
                                    cost: true
                                }
                            }
                        }
                    }
                }
            });
            return NextResponse.json(user, { status: 200 });
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
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Incorrect connect." },
                { status: 400 }
            );
        }
    }
}


const POST = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    
    if (page !== "settings") {
        return NextResponse.json(
            { message: "Incorrect connect. Query (POST) must be sent by Settings Page." },
            { status: 400 }
        );
    }

    const { oldName, oldNickname, newName, newSurname, newNickname, newUserPhoto } = await request.json();

    if (!oldName && !newName && !newSurname) {
        return NextResponse.json(
            { message: "Empty values are found! Server can't get old and new data from Settings Page." },
            { status: 400 }
        );
    }
        
    const [oldFirstName, oldLastName] = oldName.split("_");

    const otherUser = await prisma.users.findFirst({
        where: {
            nickName: newNickname
        }
    });
    
    if (otherUser !== null) { 
        return NextResponse.json(
            { message: `The new nickname (${newNickname}) is already taken!` },
            { status: 400 }
        );
    }

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

    return NextResponse.json(
        {
            status: "Success",
            redirect: `/${newName}_${newSurname}/settingsPage`
        },
        { status: 200 }
    );
}

export { GET, POST };
