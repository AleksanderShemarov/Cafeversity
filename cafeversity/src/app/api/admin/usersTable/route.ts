import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const page = searchParams.get("page");

        if (page === "dashboard/panel") {
            const users = await prisma.users.findMany({
                include: {
                    customSets: { select: { id: true } }
                }
            });

            const serializedUsers = users.map(user => ({
                ...user,
                resetTokenExpiry: user.resetTokenExpiry?.toISOString() !== undefined
                    ? user.resetTokenExpiry?.toISOString() : null,
                customSets: user.customSets?.id
            }));

            return NextResponse.json(serializedUsers, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Incorrect connect to 'admin/usersTable/GET'." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("usersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

const PATCH = async (request: Request) => {
    try {
        const { id, updatedRow } = await request.json();

        const serializedUpdatedRow = {
            ...updatedRow,
            customSets: updatedRow.customSets
            && { 
                connect: {
                    id: updatedRow.customSets
                }
            }
        };

        const result: boolean = await prisma.$transaction(async (tx) => {
            const user = await tx.users.findUnique({
                where: {
                    id: id
                }
            });

            if (!user) return false;

            await tx.users.update({
                where: {
                    id: user.id
                },
                data: serializedUpdatedRow
            });

            return true;
        })

        return NextResponse.json(
            {
                message: result ? "User has been updated." : "User doesn't exist!",
                status: result ? "Success" : "Error"
            },
            { status: result ? 201 : 400 }
        );
    } catch (error) {
        console.error("usersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

const DELETE = async (request: Request) => {
    try {
        const idsArray = await request.json();

        const deleteResult = await prisma.$transaction([
            prisma.customSets.deleteMany({
                where: {
                    userId: {
                        in: [...idsArray]
                    }
                }
            }),
            prisma.users.deleteMany({
                where: {
                    id: {
                        in: [...idsArray]
                    }
                }
            })
        ]);

        return NextResponse.json(
            {
                message: `${Number(deleteResult)} user${Number(deleteResult) === 1 ? " has" : "s have"} been deleted.`,
                status: "Success"
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("usersTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

export { GET, PATCH, DELETE };
