import { NextResponse } from "next/server";
import prisma from "../../../../../lib/utils/prismaClient";


const GET = async () => {
    const adminUsers = await prisma.adminUsers.findMany();
    return NextResponse.json(adminUsers, { status: 200 });
}

export { GET };
