import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prismaClient";


const GET = async () => {
    const dishes = await prisma.dishes_BY.findMany();
    return NextResponse.json(dishes);
}

export { GET };
