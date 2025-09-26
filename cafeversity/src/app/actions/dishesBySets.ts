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
            },
            favouriteDish: {
                select: {
                    dishID: true,
                }
            }
        }
    });

    if (!user?.customSets) return [];

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

    const favouriteDishIds = user.favouriteDish.map(fav => fav.dishID);

    const dishes = await prisma.dishes_BY.findMany({
        where: {
            AND: [
                ...conditions,
                {
                    NOT: {
                        id: {
                            in: favouriteDishIds.length > 0 ? favouriteDishIds : [-1]
                        }
                    }
                }
            ].filter(condition => condition !== undefined)
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