import { PrismaClient } from "@prisma/client";


// This code is suitable for JavaScript and needs to have "global.d.ts" for "global" typing

// let prisma: PrismaClient;
// 
// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }
// 
// export default prisma;


const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
