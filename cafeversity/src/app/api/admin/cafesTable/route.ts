import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async (request: NextRequest) => {
    try {
        const searchParams = new URL(request.url).searchParams;
        const page = searchParams.get("page");

        if (page === "dashboard/cafesPanel") {
            const cafes = await prisma.cafes.findMany({
                select: {
                    ID: true,
                    cafeName: true,
                    openHours: true,
                    city: true,
                    street: true,
                    country: true,
                    phone: true,
                }
            });

            const preparedCafes = cafes.map(cafe => ({
                id: cafe.ID, cafeName: cafe.cafeName, openHour: cafe.openHours,
                city: cafe.city, street: cafe.street, country: cafe.country, phone: cafe.phone
            }));

            return NextResponse.json(preparedCafes, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Incorrect connect to 'admin/cafesTable/GET'." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("cafesTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

const POST = async (request: Request) => {
    const { cafeName, openHour, city, street, country, phone } = await request.json();

    const isCafe = await prisma.cafes.findUnique({
        where: {
            cafeName: cafeName
        }
    });

    if (isCafe) return NextResponse.json(
        {
            message: `Cafe with name ${cafeName} is already existed!`,
            status: "Error"
        },
        { status: 409 }
    );

    const newCafe = await prisma.cafes.create({
        data: {
            cafeName: cafeName,
            openHours: openHour,
            city: city,
            street: street,
            country: country,
            phone: phone,
        },
        select: {
            ID: true,
            cafeName: true,
            openHours: true,
            city: true,
            street: true,
            country: true,
            phone: true,
        }
    });

    return NextResponse.json(
        {
            message: `New cafe (${cafeName}) has been created!`,
            newTableRow: {
                id: newCafe.ID, cafeName: newCafe.cafeName, openHour: newCafe.openHours,
                city: newCafe.city, street: newCafe.street, country: newCafe.country, phone: newCafe.phone
            },
            status: "Success"
        },
        { status: 201 }
    );
}

const PATCH = async (request: Request) => {
    try {
        const { id, updatedRow } = await request.json();

        const result: boolean = await prisma.$transaction(async (tx) => {
            const cafe = await tx.cafes.findUnique({
                where: {
                    ID: id
                }
            });

            if (!cafe) return false;

            await tx.cafes.update({
                where: {
                    ID: cafe.ID
                },
                data: {
                    cafeName: updatedRow.cafeName,
                    openHours: updatedRow.openHour,
                    city: updatedRow.city,
                    street: updatedRow.street,
                    country: updatedRow.country,
                    phone: updatedRow.phone,
                }
            });

            return true;
        });

        return NextResponse.json(
            {
                message: result ? "Cafe has been updated." : "Cafe doesn't exist!",
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

        await prisma.$transaction([
            prisma.cafes.deleteMany({
                where: {
                    ID: {
                        in: [...idsArray]
                    }
                }
            })
        ]);

        return NextResponse.json(
            {
                message: `${idsArray.length} cafe${idsArray.length === 1 ? " has" : "s have"} been deleted.`,
                status: "Success"
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("cafesTable API Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error: Problem with Server Connection" },
            { status: 500 }
        );
    }
}

export { GET, POST, PATCH, DELETE };
