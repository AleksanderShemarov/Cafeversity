import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams;
    const id = searchParams.get("id");
    const info = searchParams.get("info");

    if (id && (info && info === "short")) {
        const dish = await prisma.dishes_BY.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                food_name: true,
                includes: true,
                imagePath: true,
                protein: true,
                fats: true,
                carbohydrates: true,
                food_portion: true,
                cost: true
            }
        });

        if (!dish) return NextResponse.json(
            { message: `The dish isn't found by id: ${id}.` },
            { status: 409 }
        )

        return NextResponse.json(dish, { status: 201 });
    }

    const dishes = await prisma.dishes_BY.findMany();
    return NextResponse.json(dishes);
}

export { GET };
