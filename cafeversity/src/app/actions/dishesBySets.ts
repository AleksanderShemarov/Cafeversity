"use server";

import prisma from "../../../lib/utils/prismaClient";


export default async function dishesBySets(userName: string) {

    const [name, surname] = userName.split("_");

    const user = await prisma.users.findFirst({
        where: {
            AND: [
                { firstName: name },
                { lastName: surname }
            ]
        },
        select: {
            customSets: {
                select: {
                    spicy: true,
                    vegetarian: true,
                    vegan: true,
                }
            }
        }
    });

    if (!user?.customSets) return [];

    // const dishes = await prisma.dishes_BY.findMany({
    //     where: {
    //         OR: [
    //             { spicy: user.customSets.spicy },
    //             { vegetarian: user.customSets.vegetarian },
    //             { vegan: user.customSets.vegan }
    //         ]
    //     },
    //     select: {
    //         id: true,
    //         food_name: true,
    //         imagePath: true,
    //         food_portion: true,
    //         cost: true
    //     }
    // });


    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const whereConditions: any = {};

    // // Если пользователь НЕ веган и НЕ вегетарианец
    // if (!user.customSets.vegetarian && !user.customSets.vegan) {
    //     if (!user.customSets.spicy) {
    //         // Показывать все НЕ острые блюда
    //         whereConditions.spicy = false;
    //     }
    //     // Если spicy = true - показываем все блюда (без фильтра по spicy)
    // }

    // // Если пользователь вегетарианец
    // if (user.customSets.vegetarian && !user.customSets.vegan) {
    //     whereConditions.vegetarian = true;
    //     if (!user.customSets.spicy) {
    //         // Если не хочет острое - исключаем острые
    //         whereConditions.spicy = false;
    //     }
    // }

    // // Если пользователь веган
    // if (user.customSets.vegan) {
    //     whereConditions.vegan = true;
    //     if (!user.customSets.spicy) {
    //         // Если не хочет острое - исключаем острые
    //         whereConditions.spicy = false;
    //     }
    // }

    // const dishes = await prisma.dishes_BY.findMany({
    //     where: whereConditions,
    //     select: {
    //         id: true,
    //         food_name: true,
    //         imagePath: true,
    //         food_portion: true,
    //         cost: true
    //     }
    // });

    const conditions = [];

    if (user.customSets.vegan) {
        conditions.push({ vegan: true });
        conditions.push(user.customSets.spicy ? { spicy: true } : { spicy: false });
    } else if (user.customSets.vegetarian) {
        conditions.push({ vegetarian: true });
        conditions.push(user.customSets.spicy ? { spicy: true } : { spicy: false });
    } else {
        if (!user.customSets.spicy) {
            conditions.push({ spicy: false });
        }
    }

    const dishes = await prisma.dishes_BY.findMany({
        where: {
            AND: conditions.length > 0 ? conditions : undefined
        },
        select: {
            id: true,
            food_name: true,
            imagePath: true,
            food_portion: true,
            cost: true
        },
    });

    const allInfoDishes = dishes.map(dish => {
        return {
            dishID: dish.id,
            dishes: {
                ...dish,
                imagePath: dish.imagePath === null ? "" : dish.imagePath,
                food_portion: Number(dish.food_portion),
                cost: Number(dish.cost),
                checkedDish: null
            }
        }
    });

    return allInfoDishes;
}